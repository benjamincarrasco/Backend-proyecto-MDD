"use strict"
import { EntitySchema } from "typeorm";

export const ReunionEntity = new EntitySchema({
    name: "Reunion",
    tableName: "reuniones",
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
        platform: {
            type: "text",
            nullable: false,
        },
        description: {
            type: "text",
            nullable: false,
        },
        startDate: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        isActive: {
            type: "boolean",
            default: false,
        },
        isClosed: {
            type: "boolean",
            default: false,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
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

export default ReunionEntity