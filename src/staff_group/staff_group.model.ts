import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Group } from 'src/group/group.model';
import { Staff } from 'src/staff/staff.model';

@Table({ tableName: 'staff_group' })
export class Staff_group extends Model<Staff_group> {
  @ForeignKey(() => Staff)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  staff_id: number;

  @ForeignKey(() => Group)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  group_id: number;
}
