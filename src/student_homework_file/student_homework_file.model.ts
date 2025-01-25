import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Student_homework } from 'src/student_homework/student_homework.model';

@Table({ tableName: 'student_homework_file' })
export class Student_homework_file extends Model<Student_homework_file> {
  @ForeignKey(() => Student_homework)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  student_homework_id: number;

  @BelongsTo(() => Student_homework)
  student_homeworks: Student_homework;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  file: string;
}
