import { Controller } from '@nestjs/common';
import { InventarioService } from './inventario.service';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  // TODO: Implementar endpoints de inventario
  // GET /inventario/productos
  // GET /inventario/productos/:id
  // POST /inventario/productos
  // PATCH /inventario/productos/:id
  // DELETE /inventario/productos/:id
  // POST /inventario/movimientos/entrada
  // POST /inventario/movimientos/ajuste
  // GET /inventario/faltantes
}

