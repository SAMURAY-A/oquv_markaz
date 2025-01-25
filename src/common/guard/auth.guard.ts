import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { StaffService } from 'src/staff/staff.service';
import { StudentService } from 'src/student/student.service';

interface User {
  email: string;
  is_active: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly staffService: StaffService,
    private readonly studentService: StudentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization kaliti berilmagan');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('JWT kaliti topilmadi');
    }

    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get('JWT_ACCESS_SECRET'),
      ) as jwt.JwtPayload;

      if (!decodedToken.email) {
        throw new UnauthorizedException('Yaroqsiz token');
      }

      let user: User | null = await this.studentService.FindByEmail(
        decodedToken.email,
      );
      if (!user) {
        user = await this.staffService.FindByEmail(decodedToken.email);
        if (!user) {
          throw new UnauthorizedException('Foydalanuvchi topilmadi');
        }
      }

      if (!user.is_active) {
        throw new ForbiddenException(
          'Sizning akkauntingiz tasdiqlanmagan. Iltimos, adminning tasdiqlashini kuting))',
        );
      }

      request.user = decodedToken;
      return true;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Yaroqsiz token');
      }

      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      throw new UnauthorizedException('Autentifikatsiya xatosi');
    }
  }
}
