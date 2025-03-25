import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthType, UserAccessLevel } from './entities/auth.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/types/user.type';
import * as bcrypt from 'bcrypt';

export interface AuthTokenPayload {
  userId?: string;
  authType?: AuthType;
  access?: UserAccessLevel;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateToken(token: string): Promise<{
    payload: any;
    source: AuthType.EMAIL;
  }> {
    const decodedToken =
      await this.jwtService.verifyAsync<AuthTokenPayload>(token);

    return { payload: decodedToken, source: AuthType.EMAIL };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (user.deletedAt) {
      throw new BadRequestException(
        `User was deleted at ${new Date(user.deletedAt).toISOString()}`,
      );
    }

    if (user) {
      let token: string;
      const validPassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (validPassword) {
        token = await this.generateAuthToken(user);

        return { token: token };
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }
  }

  generateAuthToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId: user.id,
        authType: AuthType.EMAIL,
        access: user.userAccessLevel,
        email: user.email,
      },
      {
        expiresIn: '24h',
      },
    );
  }
}
