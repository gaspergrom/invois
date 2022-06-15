import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { ClientsController } from './clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService, ClientsRepository],
  controllers: [ClientsController],
})
export class ClientsModule {}
