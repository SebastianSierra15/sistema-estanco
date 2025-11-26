import { Controller } from '@nestjs/common';
import { VentasService } from './ventas.service';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  // TODO: Implementar endpoints de ventas
  // POST /ventas/rapida
  // POST /ventas/asociada-uso
  // GET /ventas
  // GET /ventas/:id
  // GET /ventas/dia
}

