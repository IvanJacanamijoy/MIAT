require("dotenv").config();
const nodemailer = require("nodemailer");

(async () => {
  try {
    // Configurar el transporte con Gmail
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Definir el correo de prueba
    const info = await transporter.sendMail({
      from: `"MIAT Soporte" <${process.env.EMAIL_USER}>`,
      to: "moralesjmd2002@gmail.com", // 👈 cámbialo por un correo tuyo
      subject: "📧 Test de envío desde MIAT",
      text: "Este es un correo de prueba enviado desde Nodemailer en MIAT 🚀",
      html: "<h2>✅ Envío correcto</h2><p>Si ves este correo, tu configuración funciona.</p>",
    });

    console.log("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
  }
})();
