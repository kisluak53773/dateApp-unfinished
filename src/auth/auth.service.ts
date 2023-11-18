import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async localSignup(
    files: Array<Express.Multer.File>,
    dto: AuthDto,
  ): Promise<Tokens> {
    console.log(files[0].path);
    const { password, email, lastname, firstname, gender, interestingGender } =
      dto;
    const hash = await this.hashData(password);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        lastname,
        firstname,
        gender,
        interestingGender,
      },
    });
    if (files) {
      for (const file of files) {
        await this.prisma.photo.create({
          data: {
            photo: file.path,
            userId: newUser.id,
          },
        });
      }
    }
    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.firstname,
      newUser.lastname,
      newUser.gender,
      newUser.interestingGender,
    );
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async localSignin(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new ForbiddenException('Access denied');
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.firstname,
      user.lastname,
      user.gender,
      user.interestingGender,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashRt) throw new ForbiddenException('Access denied');
    const rtCompare = await bcrypt.compare(rt, user.hashRt);
    if (!rtCompare) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(
      user.id,
      user.email,
      user.firstname,
      user.lastname,
      user.gender,
      user.interestingGender,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }

  async getTokens(
    userId: number,
    email: string,
    firstname: string,
    lastname: string,
    gender: string,
    interestingGender: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      firstname,
      lastname,
      gender,
      interestingGender,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_KEY'),
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET_KEY'),
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
