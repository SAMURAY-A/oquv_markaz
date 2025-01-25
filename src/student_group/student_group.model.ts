import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Group } from 'src/group/group.model';
import { Student } from 'src/student/student.model';

@Table({ tableName: 'student_group' })
export class Student_group extends Model<Student_group> {
  @ForeignKey(() => Student)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  student_id: number;

  @ForeignKey(() => Group)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  group_id: number;
}
