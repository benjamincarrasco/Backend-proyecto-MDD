"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import { createReunion, getAllReuniones, startReunion, closeReunion, deleteReunion } from "../controllers/reunion.controller.js";

const router = Router();

//todos pueden ver las reuniones existentes
router.get("/all", getAllReuniones);

router.use(authenticateJwt);

//Solo administradores pueden crear/cerrar/iniciar/eliminar reuniones
router.post("/create", isAdmin, createReunion);
router.patch("/:reunionId/close", authenticateJwt, isAdmin, closeReunion);
router.patch("/:reunionId/start", authenticateJwt, isAdmin, startReunion);
router.delete("/:reunionId", authenticateJwt, isAdmin, deleteReunion);

export default router