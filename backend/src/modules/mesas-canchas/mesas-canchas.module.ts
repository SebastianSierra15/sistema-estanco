import { Module } from '@nestjs/common';
import { MesasCanchasController } from './mesas-canchas.controller';
import { MesasCanchasService } from './mesas-canchas.service';

@Module({
  controllers: [MesasCanchasController],
  providers: [MesasCanchasService],
  exports: [MesasCanchasService],
})
export class MesasCanchasModule {}

