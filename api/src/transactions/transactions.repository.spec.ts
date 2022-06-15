import {TransactionsRepository} from './transactions.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {FindOperator, ILike, Repository} from 'typeorm';
import {Transaction} from './entities/transaction.entity';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

describe('Transactions Repository', () => {
    let repo: TransactionsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsRepository,
            ],
        }).compile();

        repo = module.get<TransactionsRepository>(TransactionsRepository);
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

    it('should list no query', async () => {
        const query = {};
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Transaction>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        const [result, total] = await repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    name: undefined,
                    userId,
                },
                {
                    description: undefined,
                    userId,
                }
            ],
            take: 20,
            skip: 0,
            relations: {
                user: false,
                project: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
        expect(result).toEqual(data);
        expect(total).toEqual(1);
    });

    it('should list with pagination', () => {
        const query: FindTransactionQueryDto = {
            page: 3,
            perPage: 15,
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Transaction>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    name: undefined,
                    userId,
                },
                {
                    description: undefined,
                    userId,
                }
            ],
            take: query.perPage,
            skip: (query.page - 1) * query.perPage,
            relations: {
                user: false,
                project: true,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    });

    it('should list with search', () => {
        const query: FindTransactionQueryDto = {
            searchQuery: 'name',
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Transaction>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    name: expect.any(FindOperator),
                    userId,
                },
                {
                    description: expect.any(FindOperator),
                    userId,
                }
            ],
            take: 20,
            skip: 0,
            relations: {
                user: false,
                project: true,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    });
});
