import { Controller } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // TODO: Implementar endpoints de usuarios
  // GET /usuarios
  // GET /usuarios/:id
  // POST /usuarios
  // PATCH /usuarios/:id
  // DELETE /usuarios/:id
}

