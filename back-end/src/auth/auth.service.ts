import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const usuarioExistente = await this.prismaService.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (usuarioExistente) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const passwordHasheada = await bcrypt.hash(registerDto.password, 10);

    const nuevoUsuario = await this.prismaService.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: passwordHasheada,
        role: 'user',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const payload: JwtPayload = {
      sub: nuevoUsuario.id,
      email: nuevoUsuario.email,
      role: nuevoUsuario.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Usuario registrado correctamente',
      access_token: accessToken,
      user: nuevoUsuario,
    };
  }

  async validateUser(email: string, password: string) {
    const usuarioEncontrado = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordEsValida = await bcrypt.compare(
      password,
      usuarioEncontrado.password,
    );

    if (!passwordEsValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      id: usuarioEncontrado.id,
      name: usuarioEncontrado.name,
      email: usuarioEncontrado.email,
      role: usuarioEncontrado.role,
    };
  }

  async login(loginDto: LoginDto) {
    const usuarioValidado = await this.validateUser(
      loginDto.email,
      loginDto.password,
    );

    const payload: JwtPayload = {
      sub: usuarioValidado.id,
      email: usuarioValidado.email,
      role: usuarioValidado.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      access_token: accessToken,
      user: usuarioValidado,
    };
  }

  async profile(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
