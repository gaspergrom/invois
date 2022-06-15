import {TransactionsService} from './transactions.service';
import {TransactionsRepository} from './transactions.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {CreateTransactionDto} from './dto/request/create-transaction.dto';
import {TransactionDto} from './dto/transaction.dto';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

describe('Transactions Service', () => {
    let service: TransactionsService;
    let repo = {
        list: jest.fn(),
        save: jest.fn(),
        findOneByOrFail: jest.fn(),
        update: jest.fn(),
        softDelete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: TransactionsRepository,
                    useValue: repo,
                },
            ],
        }).compile();

        service = module.get<TransactionsService>(TransactionsService);
        repo = module.get(TransactionsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create', async () => {
        const createData: CreateTransactionDto = {name: 'Some name'} as CreateTransactionDto;
        const userId = '1234';

        await service.create(createData, userId);

        expect(repo.save).toHaveBeenCalledWith({
            ...createData,
            userId,
        });
    });

    it('should get one', async () => {
        const transactionId = '4567';
        const userId = '1234';

        await service.getOneById(transactionId, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: transactionId,
            userId,
        });
    });

    it('should update', async () => {
        const transactionId = '4567';
        const updateData: Partial<TransactionDto> = {name: 'Some name'} as CreateTransactionDto;
        const userId = '1234';
        repo.findOneByOrFail.mockResolvedValue(true)

        await service.update(transactionId, updateData, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: transactionId,
            userId,
        });

        expect(repo.update).toHaveBeenCalledWith(transactionId, updateData);
    });

    it('should delete', async () => {
        const transactionId = '4567';
        const userId = '1234';
        repo.findOneByOrFail.mockResolvedValue(true)

        await service.delete(transactionId, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: transactionId,
            userId,
        });

        expect(repo.softDelete).toHaveBeenCalledWith(transactionId);
    });

    it('should get list', async () => {
        const query = {
            page: 2,
            perPage: 15
        } as FindTransactionQueryDto;
        const userId = '4567';
        const data = [true];
        repo.list.mockResolvedValue([data, 1])

        const returnedValue = await service.getList(query, userId);

        expect(repo.list).toHaveBeenCalledWith(query, userId);
        expect(returnedValue.page).toEqual(query.page)
        expect(returnedValue.perPage).toEqual(query.perPage)
        expect(returnedValue.total).toEqual(1)
        expect(returnedValue.data).toEqual(data)
    });

    it('should get list without query', async () => {
        const query = {} as FindTransactionQueryDto;
        const userId = '4567';
        const data = [true];
        repo.list.mockResolvedValue([data, 1])

        const returnedValue = await service.getList(query, userId);

        expect(repo.list).toHaveBeenCalledWith(query, userId);
        expect(returnedValue.page).toEqual(1)
        expect(returnedValue.perPage).toEqual(20)
        expect(returnedValue.total).toEqual(1)
        expect(returnedValue.data).toEqual(data)
    });
});
