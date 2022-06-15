import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import {Transaction} from './entities/transaction.entity';
import {TransactionsController} from './transactions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsService, TransactionsRepository],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
