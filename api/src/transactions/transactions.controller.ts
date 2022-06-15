import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Pagination } from '../shared/models/Pagination';
import { Auth, AuthUser } from '../shared/decorators/auth.decorator';
import { AuthData } from '../shared/models/AuthData';
import {ApiTags} from '@nestjs/swagger';
import {CreateTransactionDto} from './dto/request/create-transaction.dto';
import {TransactionDto} from './dto/transaction.dto';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Auth()
  @Post('')
  create(
    @Body() body: CreateTransactionDto,
    @AuthUser() user: AuthData,
  ): Promise<TransactionDto> {
    return this.service.create(body, user.id);
  }

  @Auth()
  @Get('/:id')
  getOne(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<TransactionDto> {
    return this.service.getOneById(id, user.id);
  }

  @Auth()
  @Get('')
  list(
    @Query() query: FindTransactionQueryDto,
    @AuthUser() user: AuthData,
  ): Promise<Pagination<TransactionDto>> {
    return this.service.getList(query, user.id);
  }

  @Auth()
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<TransactionDto>,
    @AuthUser() user: AuthData,
  ): Promise<TransactionDto> {
    return this.service.update(id, body, user.id);
  }

  @Auth()
  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<boolean> {
    return this.service.delete(id, user.id);
  }
}
