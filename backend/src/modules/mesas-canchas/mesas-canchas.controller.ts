import { Controller } from '@nestjs/common';
import { MesasCanchasService } from './mesas-canchas.service';

@Controller('mesas-canchas')
export class MesasCanchasController {
  constructor(private readonly mesasCanchasService: MesasCanchasService) {}

  // TODO: Implementar endpoints de mesas y canchas
  // GET /mesas-canchas
  // GET /mesas-canchas/:id
  // POST /mesas-canchas/iniciar-uso
  // POST /mesas-canchas/finalizar-uso
  // POST /mesas-canchas/registrar-consumo
  // GET /mesas-canchas/historial
}

