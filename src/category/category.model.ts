import { All } from '@nestjs/common';
import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';

@Table({ tableName: 'category' })
export class Category extends Model<Category> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Course)
  course: Course[];
}
