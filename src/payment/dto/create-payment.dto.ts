import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The payment method used, either cash or card',
    enum: ['naqt', 'karta'],
  })
  @IsEnum(['naqt', 'karta'])
  payment_method: 'naqt' | 'karta';

  @ApiProperty({
    description: 'The status of the payment',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Total payment amount',
    type: Number,
  })
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    description: 'Enrollment ID associated with the payment',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  enrollment_id: number;
}
