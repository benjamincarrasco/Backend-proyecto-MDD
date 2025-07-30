"use strict";
import { ReunionEntity } from "../entity/reunion.entity.js"
import { AppDataSource } from "../config/configDb.js";
import { createReunionValidation } from "../validations/reunion.validation.js";

export async function createReunion(req, res) {
    try {
        //valida que el usuario sea administrador
        if (req.user.role !== "administrador") {
            return res.status(403).json({
                message: "Solo un administrador puede crear reuniones",
            });
        }
         //validar la entrada
        const { error } = createReunionValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
             message: error.message
            });
        }

        const {title, platform, description, startDate} = req.body;
        const reunionRepository = AppDataSource.getRepository(ReunionEntity);

        //crear reunion
        const newReunion = reunionRepository.create({
            title,
            platform,
            description,
            startDate: new Date(startDate),
            createdBy: req.user.id,
        });

        await reunionRepository.save(newReunion); //Se guarda la reunion creada

        


        res.status(201).json({
            message: "Reunión creada exitosamente",
            data: newReunion,
        });

    }catch (error) {
        console.error("Error al crear la reunión: ", error);
        res.status(500).json({
            message: "Error al crear la reunión"
        });
    }
}

export async function getAllReuniones(req, res) {
    try {
        const reunionRepository = AppDataSource.getRepository(ReunionEntity);
        const reuniones = await reunionRepository.find({
            where: {isClosed: false},
            order: { createdAt: "DESC"},
        });
        res.status(200).json({
            message: "Reuniones activas encontradas",
            data: reuniones,
        });
    }catch (error) {
        console.log("Error al encontrar las reuniones: ", error);
        res.status(500).json({
            message: "Error al encontrar las reuniones"
        });
    }
}

export async function startReunion(req, res) {
    try {
        const { reunionId } = req.params;
        const reunionRepository = AppDataSource.getRepository(ReunionEntity);

        await reunionRepository.update(reunionId, { isActive: true });

        res.status(200).json({
            message: "Reunión iniciada exitosamente"
        });
    }catch (error) {
        res.status(500).json({
            message: "Error al iniciar la reunión"
        });
    }
}

export async function closeReunion(req, res) {
    try{
        const { reunionId } = req.params;
        const reunionRepository = AppDataSource.getRepository(ReunionEntity);

        await reunionRepository.update(reunionId, { isActive: false });
        await reunionRepository.update(reunionId, { isClosed: true})
        
        res.status(200).json({
            message: "Reunión cerrada exitosamente"
        });
    }catch (error) {
        res.status(500).json({
            message: "Error al cerrar la reunión"
        });
    }
}

export async function deleteReunion(req, res) {
    try {
        const { reunionId } = req.params;
        const reunionRepository = AppDataSource.getRepository(ReunionEntity);

        await reunionRepository.delete(reunionId);

        res.status(200).json({
            message: "Reunión eliminada exitosamente"
        });
    }catch {
        res.status(500).json({
            message: "Error al eliminar la reunión"
        });
    }
}