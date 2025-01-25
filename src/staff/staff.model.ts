import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  HasOne,
  BelongsToMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';
import { Group } from 'src/group/group.model';
import { Staff_course } from 'src/staff_course/staff_course.model';
import { Staff_group } from 'src/staff_group/staff_group.model';

@Table({ tableName: 'staff' })
export class Staff extends Model<Staff> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

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

  @Column({
    type: DataType.ENUM('admin', 'teacher'),
  })
  role: 'admin' | 'teacher';

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @BelongsToMany(() => Course, () => Staff_course)
  courses: Course[];

  @BelongsToMany(() => Group, () => Staff_group)
  groups: Group[];
}
