import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Homework } from 'src/homework/homework.model';
import { Student_homework } from 'src/student_homework/student_homework.model';

@Table({ tableName: 'homework_ball' })
export class Homework_ball extends Model<Homework_ball> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  ball: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ForeignKey(() => Student_homework)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  Student_homework_id: number;

  @BelongsTo(() => Student_homework)
  student_homeworks: Student_homework;
}
