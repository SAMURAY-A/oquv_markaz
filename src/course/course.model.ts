import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.model';
import { Enrollment } from 'src/enrollment/enrollment.model';
import { Group } from 'src/group/group.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { Staff } from 'src/staff/staff.model';
import { Staff_course } from 'src/staff_course/staff_course.model';

@Table({ tableName: 'course' })
export class Course extends Model<Course> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  date_period: Date;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  daily_duration: Date;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Lesson_of_couses)
  lesson_of_couses: Lesson_of_couses[];

  @BelongsToMany(() => Staff, () => Staff_course)
  staff: Staff[];

  @HasMany(() => Group)
  group: Group[];

  @HasMany(() => Enrollment)
  enrollment: Enrollment[];
}
