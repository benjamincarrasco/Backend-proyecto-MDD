import { AppDataSource } from "../config/configDb.js";
import { Acta } from "../entity/acta.entity.js";
import nodemailer from "nodemailer";

export const uploadActa = async (req, res) => {
  // Validar correo institucional
  if (!req.user.email.endsWith("@alumnos.ubiobio.cl")) {
    return res.status(403).json({ message: "Solo correos institucionales pueden subir actas" });
  }

  // Validar que la fecha de la reunión sea de este año
  const meetingDate = new Date(req.body.meetingDate);
  const currentYear = new Date().getFullYear();
  if (meetingDate.getFullYear() !== currentYear) {
    return res.status(400).json({ message: "La reunión debe ser de este año" });
  }

  // Guardar en BD
  const actaRepository = AppDataSource.getRepository(Acta);

  // Verificar si ya existe un acta para este email
  const existingActa = await actaRepository.findOne({ 
    where: { email: req.user.email }
  });

  if (existingActa) {
    return res.status(400).json({ 
      message: "Ya has subido un acta este año" 
    });
  }

  const newActa = actaRepository.create({
    email: req.user.email,
    fileName: req.file.originalname,
    meetingDate: meetingDate,
    sentAt: new Date()
  });

  await actaRepository.save(newActa);

  // Configura el transporte de correo
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "TU_CORREO@gmail.com",
      pass: "TU_CONTRASEÑA"
    }
  });

  // Lista de correos de estudiantes 
  const estudiantes = [
    "estudiante1@alumnos.ubiobio.cl",
    "estudiante2@alumnos.ubiobio.cl"
  ];

  try {
    await transporter.sendMail({
      from: "TU_CORREO@gmail.com",
      to: estudiantes,
      subject: "Resumen de Acta de Reunión",
      text: req.body.resumen,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer
        }
      ]
    });

    res.status(200).json({ message: "Acta subida y enviada a los estudiantes" });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ message: "Error al enviar el acta por correo" });
  }
};