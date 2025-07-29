"use strict";
import Joi from "joi";

export const createActaValidation = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .required()
        .messages({
            "string.min": "El título debe tener al menos 5 caracteres.",
            "string.max": "El título no puede exceder los 255 caracteres.",
            "string.empty": "El título es obligatorio.",
        }),
    content: Joi.string()
        .min(10)
        .required()
        .messages({
            "string.min": "El contenido debe tener al menos 10 caracteres.",
            "string.empty": "El contenido es obligatorio.",
        }),
}).unknown(false);
