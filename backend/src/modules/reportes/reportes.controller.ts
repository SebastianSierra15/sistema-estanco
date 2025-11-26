import { Controller } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  // TODO: Implementar endpoints de reportes
  // GET /reportes/ventas/diario
  // GET /reportes/inventario
  // GET /reportes/faltantes
  // GET /reportes/exportar/:tipo
}

