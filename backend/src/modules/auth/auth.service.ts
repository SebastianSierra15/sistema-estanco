import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { usuario, contrasena } = loginDto;

    // Buscar usuario por nombre de usuario
    const usuarioEncontrado = await this.prisma.usuario.findUnique({
      where: { usuarioUsuario: usuario },
      include: {
        rol: true,
      },
    });

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar estado del usuario
    if (usuarioEncontrado.usuarioEstado !== 'activo') {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.usuarioContrasena,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT token
    const payload = {
      sub: usuarioEncontrado.usuarioId,
      usuario: usuarioEncontrado.usuarioUsuario,
      rol: usuarioEncontrado.rol.rolNombre,
    };

    const expires =
      Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 86400;

    const access_token = this.jwtService.sign(payload, {
      expiresIn: expires, // en segundos
    });

    return {
      access_token,
      usuario: {
        usuarioId: usuarioEncontrado.usuarioId,
        usuarioNombre: usuarioEncontrado.usuarioNombre,
        usuarioUsuario: usuarioEncontrado.usuarioUsuario,
        rol: {
          rolId: usuarioEncontrado.rol.rolId,
          rolNombre: usuarioEncontrado.rol.rolNombre,
        },
      },
    };
  }

  async validateUser(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { usuarioId },
      include: {
        rol: true,
      },
    });

    if (!usuario || usuario.usuarioEstado !== 'activo') {
      return null;
    }

    return {
      usuarioId: usuario.usuarioId,
      usuarioNombre: usuario.usuarioNombre,
      usuarioUsuario: usuario.usuarioUsuario,
      rol: usuario.rol,
    };
  }

  async logout(token: string): Promise<{ message: string }> {
    // En una implementación más completa, aquí se invalidaría el token
    // Por ahora, el logout es manejado en el frontend eliminando el token
    return { message: 'Sesión cerrada exitosamente' };
  }
}
