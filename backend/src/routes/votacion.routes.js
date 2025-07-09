"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";
import { createVoting, getActiveVotings, castVote, getVotingResults, closeVoting, deleteVoting } from "../controllers/votacion.controller.js"

const router = new Router();

// Rutas públicas
router.get("/", getActiveVotings);
router.get("/:votingId/results", getVotingResults);

// Middleware para autenticar el JWT
router.use(authenticateJwt);

// Solo estudiantes pueden votar
router.post("/:votingId/vote", authenticateJwt ,castVote);

// Solo administradores pueden crear/modificar/eliminar votaciones
router.post("/", isAdmin, createVoting);
router.patch("/:votingId/close", authenticateJwt,isAdmin, closeVoting);
router.delete("/:votingId", authenticateJwt,isAdmin, deleteVoting);

export default router;