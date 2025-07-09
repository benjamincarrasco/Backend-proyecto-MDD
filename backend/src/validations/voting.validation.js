"use strict";
import Joi from "joi";
import { registerValidation } from "./auth.validation.js";

export const createVotingValidation = Joi.object({
  title: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      "string.min": "El título debe tener al menos 5 caracteres",
      "string.max": "El título no puede exceder los 100 caracteres",
      "string.empty": "El título es obligatorio",
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
  endDate: Joi.date()
    .greater('now')
    .required()
    .messages({
      "date.base": "La fecha de finalización debe ser válida",
      "date.greater": "La fecha de finalización debe ser futura",
      "any.required": "La fecha de finalización es obligatoria",
    }),
}).unknown(false);

export const voteValidation = Joi.object({
  opcion: Joi.string()
    .valid("si", "no")
    .required()
    .messages({
      "any.only": "La opción de voto debe ser 'si' o 'no'",
      "any.required": "La opción de voto es obligatoria",
    }),
}).unknown(false);