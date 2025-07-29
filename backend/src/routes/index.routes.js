"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js";
import votingRoutes from "./votacion.routes.js"
import reunionRoutes from "./reunion.routes.js"

const router = new Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/voting", votingRoutes);
router.use("/reuniones", reunionRoutes);


export default router;