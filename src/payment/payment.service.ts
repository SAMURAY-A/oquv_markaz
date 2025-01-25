import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll();
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const [updated] = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  remove(id: number) {
    return this.paymentModel.destroy({ where: { id } });
  }
}
