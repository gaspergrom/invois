import {ProjectsRepository} from './projects.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {FindOperator, ILike, Repository} from 'typeorm';
import {Project} from './entities/project.entity';
import {FindProjectQueryDto} from './dto/request/find-project-query.dto';

describe('Projects Repository', () => {
    let repo: ProjectsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsRepository,
            ],
        }).compile();

        repo = module.get<ProjectsRepository>(ProjectsRepository);
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

    it('should list no query', async () => {
        const query = {};
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        const [result, total] = await repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
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
        const query: FindProjectQueryDto = {
            page: 3,
            perPage: 15,
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
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
        const query: FindProjectQueryDto = {
            searchQuery: 'name',
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.list(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: {
                userId,
                projectName: expect.any(FindOperator)
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

    it('should overview no query', async () => {
        const query = {};
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        const [result, total] = await repo.overview(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    projectName: undefined,
                    userId,
                },
                {
                    client: {
                        companyName: undefined,
                    },
                    userId,
                },
            ],
            take: 20,
            skip: 0,
            relations: {
                user: false,
                client: true,
            },
            order: {
                createdAt: 'DESC',
                client: {
                    createdAt: 'DESC',
                    id: 'ASC',
                },
            },
        });
        expect(result).toEqual(data);
        expect(total).toEqual(1);
    });

    it('should overview with pagination', () => {
        const query: FindProjectQueryDto = {
            page: 3,
            perPage: 15,
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.overview(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    projectName: undefined,
                    userId,
                },
                {
                    client: {
                        companyName: undefined,
                    },
                    userId,
                },
            ],
            take: query.perPage,
            skip: (query.page - 1) * query.perPage,
            relations: {
                user: false,
                client: true,
            },
            order: {
                createdAt: 'DESC',
                client: {
                    createdAt: 'DESC',
                    id: 'ASC',
                },
            },
        })
    });

    it('should overview with search', () => {
        const query: FindProjectQueryDto = {
            searchQuery: 'name',
        };
        const userId = '1234';
        const data = [true]

        const repositoryMock = jest.spyOn(Repository<Project>.prototype, 'findAndCount').mockResolvedValueOnce([data, 1]);
        repo.overview(query, userId);

        expect(repositoryMock).toHaveBeenCalledWith({
            where: [
                {
                    projectName: expect.any(FindOperator),
                    userId,
                },
                {
                    client: {
                        companyName: expect.any(FindOperator),
                    },
                    userId,
                },
            ],
            take: 20,
            skip: 0,
            relations: {
                user: false,
                client: true,
            },
            order: {
                createdAt: 'DESC',
                client: {
                    createdAt: 'DESC',
                    id: 'ASC',
                },
            },
        })
    });
});
