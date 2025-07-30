"use strict";
import { EntitySchema } from "typeorm";
// Definición de la entidad ActaSent
export const ActaSentEntity = new EntitySchema({
    name: "ActaSent",   // Nombre de la entidad
    tableName: "actas_sent",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        sentAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
    relations: {
        acta: {
            target: "Acta", // Relación con la entidad Acta
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
        user: {
            target: "User", // Relación con la entidad User
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
    },
    uniques: [
        {
            columns: ["acta", "user"],
        },
    ],
});

export default ActaSentEntity;