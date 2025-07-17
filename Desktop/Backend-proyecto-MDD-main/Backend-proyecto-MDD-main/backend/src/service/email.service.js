import nodemailer from "nodemailer";
import { DB_USERNAME, PASSWORD } from "../config/configEnv.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: DB_USERNAME, // Usando tu variable de entorno
    pass: PASSWORD     // Usando tu variable de entorno
  }
});

export const sendActaEmail = async (toEmail, fileBuffer, fileName) => {
  const mailOptions = {
    from: DB_USERNAME,
    to: toEmail,
    subject: "Resumen de Acta de Reunión 2024",
    text: "Adjunto encontrará el resumen del acta de reunión.",
    attachments: [{
    filename: fileName, 
     content: fileBuffer
    }]
  };

  return await transporter.sendMail(mailOptions);
};