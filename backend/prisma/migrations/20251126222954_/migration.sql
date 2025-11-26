-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "core";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "inventario";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "mesas";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ventas";

-- CreateTable
CREATE TABLE "auth"."rol" (
    "rol_id" SERIAL NOT NULL,
    "rol_nombre" VARCHAR(100) NOT NULL,
    "rol_descripcion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "auth"."permiso" (
    "permiso_id" SERIAL NOT NULL,
    "permiso_nombre" VARCHAR(100) NOT NULL,
    "permiso_descripcion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("permiso_id")
);

-- CreateTable
CREATE TABLE "auth"."rol_permiso" (
    "rol_id" INTEGER NOT NULL,
    "permiso_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rol_permiso_pkey" PRIMARY KEY ("rol_id","permiso_id")
);

-- CreateTable
CREATE TABLE "auth"."usuario" (
    "usuario_id" SERIAL NOT NULL,
    "usuario_nombre" VARCHAR(200) NOT NULL,
    "usuario_usuario" VARCHAR(100) NOT NULL,
    "usuario_contrasena" VARCHAR(255) NOT NULL,
    "usuario_estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
    "rol_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "core"."auditoria" (
    "auditoria_id" SERIAL NOT NULL,
    "auditoria_tabla" VARCHAR(100) NOT NULL,
    "auditoria_accion" VARCHAR(50) NOT NULL,
    "auditoria_fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "auditoria_datos" JSONB,

    CONSTRAINT "auditoria_pkey" PRIMARY KEY ("auditoria_id")
);

-- CreateTable
CREATE TABLE "mesas"."tipo_mesa" (
    "tipo_mesa_id" SERIAL NOT NULL,
    "tipo_mesa_nombre" VARCHAR(100) NOT NULL,
    "tipo_mesa_descripcion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "tipo_mesa_pkey" PRIMARY KEY ("tipo_mesa_id")
);

-- CreateTable
CREATE TABLE "mesas"."tarifa" (
    "tarifa_id" SERIAL NOT NULL,
    "tarifa_por_minuto" DECIMAL(10,2) NOT NULL,
    "tarifa_por_intervalo" DECIMAL(10,2),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "tarifa_pkey" PRIMARY KEY ("tarifa_id")
);

-- CreateTable
CREATE TABLE "mesas"."intervalo" (
    "intervalo_id" SERIAL NOT NULL,
    "intervalo_duracion" INTEGER NOT NULL,
    "intervalo_estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "intervalo_pkey" PRIMARY KEY ("intervalo_id")
);

-- CreateTable
CREATE TABLE "mesas"."mesa" (
    "mesa_id" SERIAL NOT NULL,
    "mesa_numero" VARCHAR(50) NOT NULL,
    "mesa_estado" VARCHAR(20) NOT NULL DEFAULT 'disponible',
    "tipo_mesa_id" INTEGER NOT NULL,
    "tarifa_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "mesa_pkey" PRIMARY KEY ("mesa_id")
);

-- CreateTable
CREATE TABLE "mesas"."uso_mesa" (
    "uso_mesa_id" SERIAL NOT NULL,
    "uso_mesa_fecha_inicio" TIMESTAMP(6) NOT NULL,
    "uso_mesa_fecha_fin" TIMESTAMP(6),
    "uso_mesa_duracion" INTEGER,
    "uso_mesa_costo_calculado" DECIMAL(10,2),
    "uso_mesa_estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
    "mesa_id" INTEGER NOT NULL,
    "intervalo_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "uso_mesa_pkey" PRIMARY KEY ("uso_mesa_id")
);

-- CreateTable
CREATE TABLE "inventario"."categoria" (
    "categoria_id" SERIAL NOT NULL,
    "categoria_nombre" VARCHAR(100) NOT NULL,
    "categoria_descripcion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "inventario"."subcategoria" (
    "subcategoria_id" SERIAL NOT NULL,
    "subcategoria_nombre" VARCHAR(100) NOT NULL,
    "subcategoria_descripcion" TEXT,
    "categoria_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "subcategoria_pkey" PRIMARY KEY ("subcategoria_id")
);

-- CreateTable
CREATE TABLE "inventario"."producto" (
    "producto_id" SERIAL NOT NULL,
    "producto_nombre" VARCHAR(200) NOT NULL,
    "producto_precio_venta" DECIMAL(10,2) NOT NULL,
    "producto_precio_costo" DECIMAL(10,2),
    "producto_stock_actual" INTEGER NOT NULL DEFAULT 0,
    "producto_stock_minimo" INTEGER NOT NULL DEFAULT 0,
    "producto_estado" VARCHAR(20) NOT NULL DEFAULT 'activo',
    "subcategoria_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "inventario"."movimiento_inventario" (
    "movimiento_id" SERIAL NOT NULL,
    "movimiento_tipo" VARCHAR(20) NOT NULL,
    "movimiento_cantidad" INTEGER NOT NULL,
    "movimiento_fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movimiento_motivo" TEXT,
    "producto_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movimiento_inventario_pkey" PRIMARY KEY ("movimiento_id")
);

-- CreateTable
CREATE TABLE "ventas"."metodo_pago" (
    "metodo_pago_id" SERIAL NOT NULL,
    "metodo_pago_nombre" VARCHAR(50) NOT NULL,
    "metodo_pago_descripcion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "metodo_pago_pkey" PRIMARY KEY ("metodo_pago_id")
);

-- CreateTable
CREATE TABLE "ventas"."venta" (
    "venta_id" SERIAL NOT NULL,
    "venta_total" DECIMAL(10,2) NOT NULL,
    "venta_fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venta_efectivo" DECIMAL(10,2),
    "venta_nequi" DECIMAL(10,2),
    "metodo_pago_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "uso_mesa_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("venta_id")
);

-- CreateTable
CREATE TABLE "ventas"."detalle_venta" (
    "detalle_venta_id" SERIAL NOT NULL,
    "detalle_venta_cantidad" INTEGER NOT NULL,
    "detalle_venta_precio_unitario" DECIMAL(10,2) NOT NULL,
    "detalle_venta_subtotal" DECIMAL(10,2) NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detalle_venta_pkey" PRIMARY KEY ("detalle_venta_id")
);

-- CreateTable
CREATE TABLE "public"."caja" (
    "caja_id" SERIAL NOT NULL,
    "caja_monto_inicial" DECIMAL(10,2) NOT NULL,
    "caja_monto_final" DECIMAL(10,2),
    "caja_fecha_apertura" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caja_fecha_cierre" TIMESTAMP(6),
    "caja_estado" VARCHAR(20) NOT NULL DEFAULT 'abierta',
    "usuario_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "caja_pkey" PRIMARY KEY ("caja_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_usuario_usuario_key" ON "auth"."usuario"("usuario_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "mesa_mesa_numero_key" ON "mesas"."mesa"("mesa_numero");

-- CreateIndex
CREATE UNIQUE INDEX "venta_uso_mesa_id_key" ON "ventas"."venta"("uso_mesa_id");

-- AddForeignKey
ALTER TABLE "auth"."rol_permiso" ADD CONSTRAINT "rol_permiso_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "auth"."rol"("rol_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."rol_permiso" ADD CONSTRAINT "rol_permiso_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "auth"."permiso"("permiso_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "auth"."rol"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "core"."auditoria" ADD CONSTRAINT "auditoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas"."mesa" ADD CONSTRAINT "mesa_tipo_mesa_id_fkey" FOREIGN KEY ("tipo_mesa_id") REFERENCES "mesas"."tipo_mesa"("tipo_mesa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas"."mesa" ADD CONSTRAINT "mesa_tarifa_id_fkey" FOREIGN KEY ("tarifa_id") REFERENCES "mesas"."tarifa"("tarifa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas"."uso_mesa" ADD CONSTRAINT "uso_mesa_mesa_id_fkey" FOREIGN KEY ("mesa_id") REFERENCES "mesas"."mesa"("mesa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas"."uso_mesa" ADD CONSTRAINT "uso_mesa_intervalo_id_fkey" FOREIGN KEY ("intervalo_id") REFERENCES "mesas"."intervalo"("intervalo_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesas"."uso_mesa" ADD CONSTRAINT "uso_mesa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario"."subcategoria" ADD CONSTRAINT "subcategoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "inventario"."categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario"."producto" ADD CONSTRAINT "producto_subcategoria_id_fkey" FOREIGN KEY ("subcategoria_id") REFERENCES "inventario"."subcategoria"("subcategoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario"."movimiento_inventario" ADD CONSTRAINT "movimiento_inventario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "inventario"."producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario"."movimiento_inventario" ADD CONSTRAINT "movimiento_inventario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas"."venta" ADD CONSTRAINT "venta_metodo_pago_id_fkey" FOREIGN KEY ("metodo_pago_id") REFERENCES "ventas"."metodo_pago"("metodo_pago_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas"."venta" ADD CONSTRAINT "venta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas"."venta" ADD CONSTRAINT "venta_uso_mesa_id_fkey" FOREIGN KEY ("uso_mesa_id") REFERENCES "mesas"."uso_mesa"("uso_mesa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas"."detalle_venta" ADD CONSTRAINT "detalle_venta_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "ventas"."venta"("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas"."detalle_venta" ADD CONSTRAINT "detalle_venta_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "inventario"."producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."caja" ADD CONSTRAINT "caja_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "auth"."usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
