export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  descripcion?: string;
}

export interface CrearProductoDto {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  descripcion?: string;
}

export interface ActualizarProductoDto {
  nombre?: string;
  categoria?: string;
  precio?: number;
  stock?: number;
  stockMinimo?: number;
  descripcion?: string;
}
