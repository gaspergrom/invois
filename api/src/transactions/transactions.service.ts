import {Injectable} from '@nestjs/common';
import {TransactionsRepository} from './transactions.repository';
import {Pagination} from '../shared/models/Pagination';
import {CreateTransactionDto} from './dto/request/create-transaction.dto';
import {TransactionDto} from './dto/transaction.dto';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

@Injectable()
export class TransactionsService {
    constructor(private readonly repo: TransactionsRepository) {
    }

    async create(data: CreateTransactionDto, userId: string): Promise<TransactionDto> {
        return await this.repo.save({
            ...data,
            userId,
        });
    }

    async getOneById(id: string, userId: string): Promise<TransactionDto> {
        return await this.repo.findOneByOrFail({
            id,
            userId,
        });
    }

    async update(
        id: string,
        data: Partial<TransactionDto>,
        userId: string,
    ): Promise<TransactionDto> {
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
        query: FindTransactionQueryDto,
        userId: string,
    ): Promise<Pagination<TransactionDto>> {
        const [data, total] = await this.repo.list(query, userId);
        return {
            total,
            page: query.page || 1,
            perPage: query.perPage || 20,
            data,
        };
    }
}
