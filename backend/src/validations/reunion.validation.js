"use strict";
import Joi from "joi";

export const createReunionValidation = Joi.object({
    title: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
        "string.min": "El título debe tener al menos 5 caracteres",
        "string.max": "El título no puede exceder los 100 caracteres",
        "string.empty": "El titulo es obligatorio",
    }),
    platform: Joi.string()
    .min(4)
    .max(50)
    .required()
    .messages({
        "string.min": "La plataforma debe tener al menos 4 caracteres",
        "string.max": "La plataforma no puede exceder los 50 caracteres",
        "string.empty": "La plataforma es obligatoria",
    }),
    description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no puede exceder los 500 caracteres",
        "string.empty": "La descripción es obligatoria",
    }),
    startDate: Joi.date()
        .greater('now')
        .required()
        .messages({
            "date.base": "La fecha de inicio debe ser válida",
            "date.greater": "La fecha de inicio debe ser futura",
            "any.required": "La fecha de inicio es obligatoria", 
        })
}).unknown(false);