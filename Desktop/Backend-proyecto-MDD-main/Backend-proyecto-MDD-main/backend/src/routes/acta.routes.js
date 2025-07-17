import express from "express";
import multer from "multer";
import { uploadActa } from "../controllers/acta.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/actas",
  authenticateJwt,
  upload.single("acta"),
  uploadActa
);

export default router;

// En el archivo del controlador acta.controller.js
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

}