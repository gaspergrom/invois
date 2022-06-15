import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { FindClientsQueryDto } from './dto/request/find-clients-query.dto';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  async list(query: FindClientsQueryDto, userId: string): Promise<any> {
    const { page, perPage, searchQuery } = query;
    const take = perPage || 20;
    const skip = (page - 1) * take || 0;

    return this.findAndCount({
      where: {
        companyName:
          searchQuery && searchQuery.length
            ? ILike(`${searchQuery}%`)
            : undefined,
        userId,
      },
      take: take,
      skip: skip,
      relations: {
        user: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
