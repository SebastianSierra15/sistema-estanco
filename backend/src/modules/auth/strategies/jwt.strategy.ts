import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { usuarioId: payload.sub },
      include: {
        rol: true,
      },
    });

    if (!usuario || usuario.usuarioEstado !== 'activo') {
      throw new UnauthorizedException('Usuario no válido o inactivo');
    }

    return {
      usuarioId: usuario.usuarioId,
      usuarioNombre: usuario.usuarioNombre,
      usuarioUsuario: usuario.usuarioUsuario,
      rol: usuario.rol,
    };
  }
}

