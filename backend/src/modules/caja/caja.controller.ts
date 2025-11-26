import { Controller } from '@nestjs/common';
import { CajaService } from './caja.service';

@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  // TODO: Implementar endpoints de caja
  // POST /caja/apertura
  // POST /caja/cierre
  // GET /caja/estado
  // GET /caja/reporte-diario
}

