import { Injectable } from '@nestjs/common';
import {ILike, Repository} from 'typeorm';
import {Transaction} from './entities/transaction.entity';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
    async list(query: FindTransactionQueryDto, userId: string): Promise<any> {
        const { perPage, page, searchQuery } = query;
        const take = perPage || 20;
        const skip = (page - 1) * take || 0;

        return this.findAndCount({
            where: [
                {
                    name:
                        searchQuery && searchQuery.length
                            ? ILike(`${searchQuery}%`)
                            : undefined,
                    userId,
                },
                {
                    description:
                        searchQuery && searchQuery.length
                            ? ILike(`${searchQuery}%`)
                            : undefined,
                    userId,
                }
            ],
            take: take,
            skip: skip,
            relations: {
                user: false,
                project: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
