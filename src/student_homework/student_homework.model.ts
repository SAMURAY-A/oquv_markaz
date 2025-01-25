import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Homework } from 'src/homework/homework.model';
import { Homework_ball } from 'src/homework_ball/homework_ball.model';
import { Student } from 'src/student/student.model';
import { Student_homework_file } from 'src/student_homework_file/student_homework_file.model';

@Table({ tableName: 'student_homework' })
export class Student_homework extends Model<Student_homework> {
  @ForeignKey(() => Homework)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  homework_id: number; 

  @BelongsTo(() => Homework)
  homework: Homework;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ForeignKey(() => Student)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  student_id: number;

  @BelongsTo(() => Student)
  student: Student;

  @HasMany(() => Homework_ball)
  homework_balls: Homework_ball[];

  @HasMany(() => Student_homework_file)
  student_homework_files: Student_homework_file[];
}
