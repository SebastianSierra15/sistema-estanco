import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { MesasCanchasModule } from './modules/mesas-canchas/mesas-canchas.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { CajaModule } from './modules/caja/caja.module';
import { ReportesModule } from './modules/reportes/reportes.module';
import { ConfiguracionModule } from './modules/configuracion/configuracion.module';
import { AuditoriaModule } from './modules/auditoria/auditoria.module';
import { LogsModule } from './modules/logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsuariosModule,
    MesasCanchasModule,
    InventarioModule,
    VentasModule,
    CajaModule,
    ReportesModule,
    ConfiguracionModule,
    AuditoriaModule,
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

