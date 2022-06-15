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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/request/create-client.dto';
import { ClientDto } from './dto/client.dto';
import { Pagination } from '../shared/models/Pagination';
import { Auth, AuthUser } from '../shared/decorators/auth.decorator';
import { UpdateClientDto } from './dto/request/update-client.dto';
import { AuthData } from '../shared/models/AuthData';
import { FindClientsQueryDto } from './dto/request/find-clients-query.dto';
import {ApiTags} from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Auth()
  @Post('')
  create(
    @Body() body: CreateClientDto,
    @AuthUser() user: AuthData,
  ): Promise<ClientDto> {
    return this.clientService.create(body, user.id);
  }

  @Auth()
  @Get('/:id')
  getOne(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<ClientDto> {
    return this.clientService.getOneById(id, user.id);
  }

  @Auth()
  @Get('')
  list(
    @Query() query: FindClientsQueryDto,
    @AuthUser() user: AuthData,
  ): Promise<Pagination<ClientDto>> {
    return this.clientService.getList(query, user.id);
  }

  @Auth()
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateClientDto,
    @AuthUser() user: AuthData,
  ): Promise<ClientDto> {
    return this.clientService.update(id, body, user.id);
  }

  @Auth()
  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<boolean> {
    return this.clientService.delete(id, user.id);
  }
}
