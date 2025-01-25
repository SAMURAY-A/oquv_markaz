import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Homework_file } from 'src/homework_files/homework_files.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { Student_homework } from 'src/student_homework/student_homework.model';

@Table({ tableName: 'homework' })
export class Homework extends Model<Homework> {
  @ForeignKey(() => Lesson_of_couses)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  lesson_of_courses_id: number;

  @BelongsTo(() => Lesson_of_couses)
  lesson_of_couses: Lesson_of_couses;

  @Column({
    type: DataType.DATE,
  })
  deadline: Date;

  @Column({
    type: DataType.STRING,
  })
  task: string;

  @HasMany(() => Homework_file)
  homework_files: Homework_file[];

  @HasMany(() => Homework_file)
  homework_file: Homework_file[];
}
