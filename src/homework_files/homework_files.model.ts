import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Homework } from 'src/homework/homework.model';

@Table({ tableName: 'Homework_files' })
export class Homework_file extends Model<Homework_file> {
  @ForeignKey(() => Homework)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  homework_id: number;

  @BelongsTo(() => Homework)
  homework: Homework;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  file: string;
}
