import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';
import { Staff } from 'src/staff/staff.model';

@Table({ tableName: 'staff_course' })
export class Staff_course extends Model<Staff_course> {
  @ForeignKey(() => Staff)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  staff_id: string;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  course_id; 
}
