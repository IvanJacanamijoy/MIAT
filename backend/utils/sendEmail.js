import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // también soporta Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // tu correo
        pass: process.env.EMAIL_PASS, // tu contraseña o App Password
      },
    });

    await transporter.sendMail({
      from: `"MIAT Soporte" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw new Error("No se pudo enviar el correo");
  }
};
