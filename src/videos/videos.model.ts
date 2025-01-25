import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';

@Table({ tableName: 'videos' })
export class Videos extends Model<Videos> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  video: string;

  @ForeignKey(() => Lesson_of_couses)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  lesson_id: number;

  @BelongsTo(() => Lesson_of_couses)
  lesson_of_course: Lesson_of_couses;
}
