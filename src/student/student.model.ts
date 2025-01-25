import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Enrollment } from 'src/enrollment/enrollment.model';
import { Group } from 'src/group/group.model';
import { Student_group } from 'src/student_group/student_group.model';
import { Student_homework } from 'src/student_homework/student_homework.model';

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @HasMany(() => Student_homework)
  student_homeworks: Student_homework[];

  @BelongsToMany(() => Group, () => Student_group)
  groups: Group[];

  @HasMany(() => Enrollment)
  enrollment: Enrollment[];
}
