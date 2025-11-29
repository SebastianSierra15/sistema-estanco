export interface Venta {
  ventaId: number;
  fecha: string; // ISO
  total: number;
  metodoPago: "efectivo" | "transferencia" | "otros";
  usuarioId: number;
}

export interface DetalleVenta {
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface CrearVentaDto {
  productos: {
    productoId: number;
    cantidad: number;
  }[];
  metodoPago: string;
}
