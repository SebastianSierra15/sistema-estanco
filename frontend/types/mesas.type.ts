export type EstadoMesa = "libre" | "ocupada";

export interface Mesa {
  mesaId: number;
  nombre: string;
  estado: EstadoMesa;
}

export interface ActualizarEstadoMesaDto {
  estado: EstadoMesa;
}
