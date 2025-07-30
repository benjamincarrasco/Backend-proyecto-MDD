"use strict";
import { EntitySchema } from "typeorm";
// Definición de la entidad Acta
export const ActaEntity = new EntitySchema({
    name: "Acta",
    tableName: "actas",    // Nombre de la tabla en la base de datos
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        content: {
            type: "text",
            nullable: false,
        },
        year: {
            type: "int",
            nullable: false,
        },
        sentAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        createdBy: {
            type: "int",
            nullable: false,
        },
    },
    relations: {
        createdBy: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
    },
});

export default ActaEntity;