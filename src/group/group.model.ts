import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  HasMany,
  HasOne,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';
import { Staff } from 'src/staff/staff.model';
import { Staff_group } from 'src/staff_group/staff_group.model';
import { Student } from 'src/student/student.model';
import { Student_group } from 'src/student_group/student_group.model';

@Table({ tableName: 'groups' })
export class Group extends Model<Group> {
  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;
  @BelongsTo(() => Course)
  course: Course;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  group_type: string;

  @BelongsToMany(() => Staff, () => Staff_group)
  staff: Staff[];

  @BelongsToMany(() => Student, () => Student_group)
  students: Student[];
}
