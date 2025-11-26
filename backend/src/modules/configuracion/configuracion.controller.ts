import { Controller } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  // TODO: Implementar endpoints de configuración
  // GET /configuracion/tarifas
  // PATCH /configuracion/tarifas
  // GET /configuracion/intervalos
  // POST /configuracion/intervalos
  // PATCH /configuracion/intervalos/:id
  // DELETE /configuracion/intervalos/:id
  // PATCH /configuracion/productos/:id/stock-minimo
}

