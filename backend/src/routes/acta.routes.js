"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import { createActa, sendActaToStudents, getActas, deleteActa } from "../controllers/acta.controller.js";

const router = Router();

// Rutas para administradores
router.post("/", authenticateJwt, isAdmin, createActa);
router.post("/:actaId/send", authenticateJwt, isAdmin, sendActaToStudents);
router.delete("/:actaId", authenticateJwt, isAdmin, deleteActa);

// Ruta pública para obtener actas (puedes restringirla si es necesario)
router.get("/", authenticateJwt, getActas); // Se requiere autenticación para ver las actas

export default router;
