import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Implementar endpoints de autenticación
  // POST /auth/login
  // POST /auth/logout
  // GET /auth/me
}

