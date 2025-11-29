export interface EstadoCaja {
  abierta: boolean;
  montoInicial: number;
  montoActual: number;
}

export interface AperturaCajaDto {
  montoInicial: number;
}

export interface CierreCajaDto {
  montoFinal: number;
}
