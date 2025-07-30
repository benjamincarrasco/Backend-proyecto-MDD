"use strict";
import { ActaEntity } from "../entity/acta.entity.js";
import { ActaSentEntity } from "../entity/actaSent.entity.js";
import { UserEntity } from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createActaValidation } from "../validations/acta.validation.js";
import nodemailer from "nodemailer"; // Necesitarás instalar nodemailer para mandar correos
import { EMAIL_USER, EMAIL_PASS } from "../config/configEnv.js"; // Nuevas variables de entorno

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio o configurar SMTP
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export async function createActa(req, res) {
    try {
        if (req.user.role !== "administrador") {
            return res.status(403).json({ message: "Solo un administrador puede crear actas." });
        }

        const { error } = createActaValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { title, content } = req.body;
        const actaRepository = AppDataSource.getRepository(ActaEntity);

        const newActa = actaRepository.create({
            title,
            content,
            year: new Date().getFullYear(), // Establecer el año actual
            createdBy: req.user.id,
        });

        await actaRepository.save(newActa);

        res.status(201).json({
            message: "Acta creada exitosamente.",
            data: newActa,
        });
    } catch (error) {
        console.error("Error al crear el acta: ", error);
        res.status(500).json({ message: "Error al crear el acta." });
    }
}

export async function sendActaToStudents(req, res) {
    try {
        if (req.user.role !== "administrador") {
            return res.status(403).json({ message: "Solo un administrador puede enviar actas." });
        }

        const { actaId } = req.params;
        const actaRepository = AppDataSource.getRepository(ActaEntity);
        const userRepository = AppDataSource.getRepository(UserEntity);
        const actaSentRepository = AppDataSource.getRepository(ActaSentEntity);

        const acta = await actaRepository.findOne({ where: { id: actaId } });
        if (!acta) {
            return res.status(404).json({ message: "Acta no encontrada." });
        }

        // Verificar que el acta sea del año actual
        if (acta.year !== new Date().getFullYear()) {
            return res.status(400).json({ message: "Solo se pueden enviar actas del año actual." });
        }

        const students = await userRepository.find({ where: { role: "estudiante" } });
        let sentCount = 0;
        let alreadySentCount = 0;

        for (const student of students) {
            // Verificar si el acta ya fue enviada a este estudiante
            const existingSentRecord = await actaSentRepository.findOne({
                where: { acta: { id: acta.id }, user: { id: student.id } },
            });

            if (existingSentRecord) {
                alreadySentCount++;
                continue; // Saltar si ya se envió
            }

            // Enviar correo
            const mailOptions = {
                from: EMAIL_USER,
                to: student.email,
                subject: `Acta de la Universidad: ${acta.title}`,
                html: `<p>Estimado/a ${student.username},</p>
                       <p>Adjuntamos el acta: <strong>${acta.title}</strong> del año ${acta.year}.</p>
                       <p>${acta.content}</p>
                       <p>Saludos cordiales,</p>
                       <p>La Administración de la Universidad</p>`,
            };

            await transporter.sendMail(mailOptions);

            // Registrar el envío
            const newActaSent = actaSentRepository.create({
                acta: { id: acta.id },
                user: { id: student.id },
            });
            await actaSentRepository.save(newActaSent);
            sentCount++;
        }

        res.status(200).json({
            message: `Acta enviada a ${sentCount} estudiantes. ${alreadySentCount} estudiantes ya la habían recibido.`,
        });
    } catch (error) {
        console.error("Error al enviar el acta por correo: ", error);
        res.status(500).json({ message: "Error al enviar el acta por correo." });
    }
}

export async function getActas(req, res) {
    try {
        const actaRepository = AppDataSource.getRepository(ActaEntity);
        const actas = await actaRepository.find({
            order: { sentAt: "DESC" },
        });
        res.status(200).json({
            message: "Actas obtenidas exitosamente.",
            data: actas,
        });
    } catch (error) {
        console.error("Error al obtener las actas: ", error);
        res.status(500).json({ message: "Error al obtener las actas." });
    }
}

export async function deleteActa(req, res) {
    try {
        if (req.user.role !== "administrador") {
            return res.status(403).json({ message: "Solo un administrador puede eliminar actas." });
        }

        const { actaId } = req.params;
        const actaRepository = AppDataSource.getRepository(ActaEntity);

        const acta = await actaRepository.findOne({ where: { id: actaId } });
        if (!acta) {
            return res.status(404).json({ message: "Acta no encontrada." });
        }

        await actaRepository.remove(acta);

        res.status(200).json({ message: "Acta eliminada exitosamente." });
    } catch (error) {
        console.error("Error al eliminar el acta: ", error);
        res.status(500).json({ message: "Error al eliminar el acta." });
    }
}
