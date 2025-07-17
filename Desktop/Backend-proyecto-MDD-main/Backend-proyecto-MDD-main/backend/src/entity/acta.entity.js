// acta.entity.js
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Acta {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  email;

  @Column()
  fileName;

  @Column({ type: "date" })
  meetingDate;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sentAt;
}