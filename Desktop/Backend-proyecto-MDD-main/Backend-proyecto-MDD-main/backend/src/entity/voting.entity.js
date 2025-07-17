"use strict";
import { EntitySchema } from "typeorm";

export const VotingEntity = new EntitySchema({
  name: "Voting",
  tableName: "votings",
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
    description: {
      type: "text",
      nullable: false,
    },
    startDate: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    endDate: {
      type: "timestamp",
      nullable: false,
    },
    isActive: {
      type: "boolean",
      default: true,
    },
    votosSi: {
      type: "int",
      default: 0,
    },
    votosNo: {
      type: "int",
      default: 0,
    },
    totalVotes: {
      type: "int",
      default: 0,
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

export default VotingEntity;