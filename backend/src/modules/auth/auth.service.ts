import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
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

    // Traer rol + permisos del rol
    const usuarioEncontrado = await this.prisma.usuario.findUnique({
      where: { usuarioUsuario: usuario },
      include: {
        rol: {
          include: {
            rolPermisos: {
              include: {
                permiso: true,
              },
            },
          },
        },
      },
    });

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuarioEncontrado.usuarioEstado !== 'activo') {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(
      contrasena,
      usuarioEncontrado.usuarioContrasena,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Construir array de permisos (nombres)
    const permisos: string[] =
      usuarioEncontrado.rol.rolPermisos?.map(
        (rp) => rp.permiso.permisoNombre,
      ) ?? [];

    // Payload del token con permisos
    const payload = {
      sub: usuarioEncontrado.usuarioId,
      usuario: usuarioEncontrado.usuarioUsuario,
      rol: usuarioEncontrado.rol.rolNombre,
      permisos,
    };

    const expires =
      Number(this.configService.get<string>('JWT_EXPIRES_IN')) || 86400;

    const access_token = this.jwtService.sign(payload, {
      expiresIn: expires,
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
      permisos,
    };
  }

  async validateUser(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { usuarioId },
      include: {
        rol: {
          include: {
            rolPermisos: {
              include: {
                permiso: true,
              },
            },
          },
        },
      },
    });

    if (!usuario || usuario.usuarioEstado !== 'activo') {
      return null;
    }

    const permisos: string[] =
      usuario.rol.rolPermisos?.map((rp) => rp.permiso.permisoNombre) ?? [];

    return {
      usuarioId: usuario.usuarioId,
      usuarioNombre: usuario.usuarioNombre,
      usuarioUsuario: usuario.usuarioUsuario,
      rol: usuario.rol,
      permisos,
    };
  }

  async logout(token: string): Promise<{ message: string }> {
    // En una implementación más completa, aquí se invalidaría el token
    // Por ahora, el logout es manejado en el frontend eliminando el token
    return { message: 'Sesión cerrada exitosamente' };
  }
}
