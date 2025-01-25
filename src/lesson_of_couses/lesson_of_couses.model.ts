import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/course/course.model';
import { Homework } from 'src/homework/homework.model';
import { Videos } from 'src/videos/videos.model';

@Table({ tableName: 'lesson_of_couses' })
export class Lesson_of_couses extends Model<Lesson_of_couses> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  lesson: string;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;
  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Homework)
  homework: Homework[];

  @HasMany(() => Videos)
  videos: Videos[];
}
