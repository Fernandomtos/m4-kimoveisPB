import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string | Date;

  @Column({ type: "time" })
  hour: Date | string;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.schedules)
  @JoinColumn()
  realEstate: RealEstate;

  @ManyToOne(() => User, (user) => user.schedules)
  @JoinColumn()
  user: User;
}

export { Schedule };
