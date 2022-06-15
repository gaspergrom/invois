import {ClientsRepository} from './clients.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {FindOperator, ILike, Repository} from 'typeorm';
import {Client} from './entities/client.entity';
import {FindClientsQueryDto} from './dto/request/find-clients-query.dto';

describe('Clients Repository', () => {
    let repo: ClientsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientsRepository,
            ],
        }).compile();

        repo = module.get<ClientsRepository>(ClientsRepository);
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

    it('should list no query', async () => {
        const query = {};
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Client>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        const [result, total] = await repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
                companyName: undefined,
                userId,
            },
            take: 20,
            skip: 0,
            relations: {
                user: false,
            },
            order: {
                createdAt: 'DESC',
            },
        });
        expect(result).toEqual(data);
        expect(total).toEqual(1);
    });

    it('should list with pagination', () => {
        const query: FindClientsQueryDto = {
            page: 3,
            perPage: 15,
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Client>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
                companyName: undefined,
                userId,
            },
            take: query.perPage,
            skip: (query.page - 1) * query.perPage,
            relations: {
                user: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    });

    it('should list with search', () => {
        const query: FindClientsQueryDto = {
            searchQuery: 'name',
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Client>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
                companyName: expect.any(FindOperator),
                userId,
            },
            take: 20,
            skip: 0,
            relations: {
                user: false,
            },
            order: {
                createdAt: 'DESC',
            },
        })
    });
});
