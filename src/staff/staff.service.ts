import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './staff.model';
import { Group } from 'src/group/group.model';
import { Course } from 'src/course/course.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/common/config/config.service';
import { LogInStaffDto } from './dto/login-staff.dto';
import { Student } from 'src/student/student.model';
import { IsUUID, IsNumberString } from 'class-validator';
import { validate as isUUID } from 'uuid';
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff) private readonly staffModel: typeof Staff,
    @InjectModel(Student) private readonly studentModel: typeof Student,
    private readonly configService: ConfigService,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const existingStaff = await this.staffModel.findOne({
      where: { email: createStaffDto.email },
    });

    if (existingStaff) {
      throw new Error('Bu email bilan xodim allaqachon mavjud.');
    }

    const hashPassword = await bcrypt.hash(createStaffDto.password, 10);
    createStaffDto.password = hashPassword;

    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.findAll({
      include: [
        {
          model: Group,
        },
        {
          model: Course,
        },
      ],
    });
  }

  findOne(id: string) {
    return this.staffModel.findByPk(id, {
      include: [
        {
          model: Group,
        },
        {
          model: Course,
        },
      ],
    });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const [updated] = await this.staffModel.update(updateStaffDto, {
      where: { id },
    });

    if (updated === 0) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return this.staffModel.destroy({ where: { id: id } });
  }

  FindByEmail(email: string) {
    return this.staffModel.findOne({
      where: { email },
    });
  }

  async login(loginUserDto: LogInStaffDto) {
    const { email, password } = loginUserDto;

    const user = await this.FindByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateAccessToken({
      email: user.dataValues.email,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({
      email: user.dataValues.email,
      role: user.role,
    });

    console.log('accessToken');
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(data: { email: string; role: string }) {
    return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '1h',
    });
  }

  private generateRefreshToken(data: { email: string; role: string }) {
    return jwt.sign(data, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '8h',
    });
  }

  async false_see() {
    const inactiveStudents = await this.studentModel.findAll({
      where: { is_active: false },
    });
    const inactiveStaff = await this.staffModel.findAll({
      where: { is_active: false },
    });

    const users = [...inactiveStudents, ...inactiveStaff];
    return users;
  }

  async users_confirmation(id: string | number) {
    if (typeof id === 'string' && isUUID(id)) {
      const [updatedStaffCount] = await this.staffModel.update(
        { is_active: true },
        { where: { id } },
      );

      if (updatedStaffCount > 0) {
        return 'Xodimning akaunti tastiqlandi!';
      }
    }

    if (typeof id === 'number' || !isNaN(Number(id))) {
      const numericId = Number(id);
      const [updatedStudentCount] = await this.studentModel.update(
        { is_active: true },
        { where: { id: numericId } },
      );

      if (updatedStudentCount > 0) {
        return 'Talabaning akaunti tastiqlandi!';
      }
    }

    return 'Bunday IDdagi foydalanuvchi topilmadi.';
  }

  async createDefaultAdmin() {
    const existingAdmin = await this.staffModel.findOne({
      where: { role: 'admin' },
    });

    if (!existingAdmin) {
      const password = '123456';
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await this.staffModel.create({
        full_name: 'Admin',
        phone: '+998944590628',
        email: 'admin@gmil.com',
        password: hashedPassword,
        role: 'admin',
        is_active: true,
      });
      return `DEFAULT Admin yaratildi. Ushbu admindan foydalanaveras))\nAdmin ma'lumotlari: ${JSON.stringify(admin)} \n passwork: 123456))`;
    } else {
      return `Admin foydalanuvchi allaqachon mavjud))`;
    }
  }
}
