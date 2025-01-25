import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Enrollment } from 'src/enrollment/enrollment.model';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @AllowNull(false)
  @Column({
    type: DataType.ENUM('naqt', 'karta'),
  })
  payment_method: 'naqt' | 'karta';

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  total_amount: number;

  @ForeignKey(() => Enrollment)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  enrollment_id: number;

  @BelongsTo(() => Enrollment)
  enrollment: Enrollment;
}
