///importamos la dependencia de jsonwebtoken
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail"); 

//importamos el modelo del usuario
const UsuarioModel = require("../models/UsuarioModel");
//importamos la configuracion de jwt
const jwtConfig = require("../config/jwtConfig");

//utilidad para enviar correos
const nodemailer = require("nodemailer");

class AuthController {
  /* ========================= LOGIN ========================= */
  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const loginUsuario = await UsuarioModel.loginUsuario(email, password);

      if (loginUsuario) {
        const payload = {
          user: {
            id: loginUsuario.IdUsuario,
            email: loginUsuario.Email,
            rol: loginUsuario.IdRol,
            nombre: loginUsuario.Nombres,
          },
        };

        jwt.sign(
          payload,
          jwtConfig.secret,
          { expiresIn: jwtConfig.expiresIn },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: `Usuario o contraseña incorrecto` });
    }
  }

  /* ========================= REGISTRO ========================= */
  async register(req, res) {
    try {
      const UsuarioData = req.body;

      const existingUser = await UsuarioModel.getUsuarioByEmail(UsuarioData.Email);
      if (existingUser) {
        return res.status(409).json({ message: "El usuario ya existe" });
      }

      await UsuarioModel.createUsuario(UsuarioData);

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creando al Usuario ", error: error.message });
    }
  }

  /* ========================= OLVIDE CONTRASEÑA ========================= */
  async forgetPassword(req, res) {
    const { email } = req.body;

    try {
      const usuario = await UsuarioModel.getUsuarioByEmail(email);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // generar token seguro
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // guardar en BD con expiración (ejemplo: 15 min)
      await UsuarioModel.saveResetToken(usuario.IdUsuario, resetTokenHash, Date.now() + 1000 * 60 * 15);

      // enviar correo
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `${process.env.FRONTEND_URL}/?resetToken=${resetToken}`;
      
      await transporter.sendMail({
        from: `"MIAT Soporte" <${process.env.EMAIL_USER}>`,
        to: usuario.Email,
        subject: "Recuperación de contraseña - MIAT",
        html: `
          <h3>Hola ${usuario.Nombres}</h3>
          <p>Recibimos una solicitud para recuperar tu contraseña.</p>
          <p>Haz clic en el siguiente enlace para restablecerla (válido por 15 minutos):</p>
          <a href="${resetUrl}" target="_blank">${resetUrl}</a>
          <br><br>
          <p>Si no solicitaste este cambio, ignora este mensaje.</p>
        `,
      });

      res.json({ message: "Correo enviado con instrucciones" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en la solicitud de recuperación" });
    }
  }

  /* ========================= CAMBIAR CONTRASEÑA ========================= */
  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const resetTokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const usuario = await UsuarioModel.findByResetToken(resetTokenHash);
      if (!usuario || usuario.ResetPasswordExpire < Date.now()) {
        return res.status(400).json({ message: "Token inválido o expirado" });
      }

      // encriptar nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await UsuarioModel.updatePassword(usuario.IdUsuario, hashedPassword);

      // limpiar token
      await UsuarioModel.clearResetToken(usuario.IdUsuario);

      res.json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error restableciendo contraseña" });
    }
  }
}

module.exports = new AuthController();
