"use strict";
import { EntitySchema } from "typeorm";

export const VoteEntity = new EntitySchema({
  name: "Vote",
  tableName: "votes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    opcion: {
      type: "enum",
      enum: ["si", "no"],
      nullable: false,
    },
    votedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    voting: {
      target: "Voting",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: true,
      nullable: false,
    },
  },
  uniques: [
    {
      columns: ["voting", "user"],
    },
  ],
});

export default VoteEntity;