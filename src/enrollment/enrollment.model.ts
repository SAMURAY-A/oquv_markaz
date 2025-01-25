import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';
import { Payment } from 'src/payment/payment.model';
import { Student } from 'src/student/student.model';

@Table({ tableName: 'enrollment' })
export class Enrollment extends Model<Enrollment> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;
  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => Student)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  student_id: number;
  @BelongsTo(() => Student)
  student: Student;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  start_date: Date;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  end_date: Date;

  @HasMany(() => Payment)
  payment: Payment[];
}
