import { Controller } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';

@Controller('auditoria')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  // TODO: Implementar endpoints de auditoría
  // GET /auditoria
  // GET /auditoria/:id
  // GET /auditoria/usuario/:usuarioId
}

