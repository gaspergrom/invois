import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/request/create-client.dto';
import { ClientDto } from './dto/client.dto';
import { Pagination } from '../shared/models/Pagination';
import { UpdateClientDto } from './dto/request/update-client.dto';
import { FindClientsQueryDto } from './dto/request/find-clients-query.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly repo: ClientsRepository) {}

  async create(data: CreateClientDto, userId: string): Promise<ClientDto> {
    return await this.repo.save({
      ...data,
      contacts: [
        {
          name: data.contactName,
          email: data.contactEmail,
        },
      ],
      userId,
    });
  }

  async getOneById(id: string, userId: string): Promise<ClientDto> {
    return await this.repo.findOneByOrFail({
      id,
      userId,
    });
  }

  async update(
    id: string,
    data: UpdateClientDto,
    userId: string,
  ): Promise<ClientDto> {
    await this.repo.findOneByOrFail({
      id,
      userId,
    });
    await this.repo.update(id, data);
    return await this.repo.findOneByOrFail({
      id,
      userId,
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    await this.repo.findOneByOrFail({
      id,
      userId,
    });
    await this.repo.softDelete(id);
    return true;
  }

  async getList(
    query: FindClientsQueryDto,
    userId: string,
  ): Promise<Pagination<ClientDto>> {
    const [data, total] = await this.repo.list(query, userId);
    return {
      total,
      page: query.page || 1,
      perPage: query.perPage || 20,
      data,
    };
  }
}
