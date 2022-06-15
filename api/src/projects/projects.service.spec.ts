import {ProjectsService} from './projects.service';
import {ProjectsRepository} from './projects.repository';
import {Test, TestingModule} from '@nestjs/testing';
import {CreateProjectDto} from './dto/request/create-project.dto';
import {Project} from './entities/project.entity';
import {FindProjectQueryDto} from './dto/request/find-project-query.dto';
import {ProjectDto} from './dto/project.dto';
import {ClientDto} from '../clients/dto/client.dto';

describe('Projects Service', () => {
    let service: ProjectsService;
    let repo = {
        findOneByOrFail: jest.fn(),
        list: jest.fn(),
        overview: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                {
                    provide: ProjectsRepository,
                    useValue: repo,
                },
            ],
        }).compile();

        service = module.get<ProjectsService>(ProjectsService);
        repo = module.get(ProjectsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create', async () => {
        const createData: CreateProjectDto = {projectName: 'Some name'};
        const userId = '1234';

        await service.create(createData, userId);

        expect(repo.save).toHaveBeenCalledWith({
            ...createData,
            userId,
        });
    });

    it('should get one', async () => {
        const projectId = '456';
        const userId = '1234';

        await service.getOneById(projectId, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: projectId,
            userId,
        });
    });

    it('should update', async () => {
        const projectId = '456';
        const updateData = {
            projectName: 'Frontend'
        } as Partial<Project>;
        const userId = '1234';
        repo.findOneByOrFail.mockResolvedValue(true)

        await service.update(projectId, updateData, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: projectId,
            userId,
        });
        expect(repo.update).toHaveBeenCalledWith(projectId, updateData);
    });

    it('should delete', async () => {
        const projectId = '456';
        const userId = '1234';
        repo.findOneByOrFail.mockResolvedValue(true)

        await service.delete(projectId, userId);

        expect(repo.findOneByOrFail).toHaveBeenCalledWith({
            id: projectId,
            userId,
        });
        expect(repo.delete).toHaveBeenCalledWith(projectId);
    });

    it('should get list', async () => {
        const query = {
            page: 2,
            perPage: 15
        } as FindProjectQueryDto;
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
        const query = {} as FindProjectQueryDto;
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

    it('should get overview', async () => {
        const query = {
            page: 2,
            perPage: 15
        } as FindProjectQueryDto;
        const userId = '4567';
        const data: ProjectDto[] = [
            {
                id: '1234',
                projectName: 'Project',
                client: {
                    id: '456',
                    companyName: 'Test',
                    address: 'New York',
                    contacts: []
                }
            },
            {
                id: '456',
                projectName: 'Project 2',
                client: {
                    id: '456',
                    companyName: 'Test',
                    address: 'New York',
                    contacts: []
                }
            },
        ];
        repo.overview.mockResolvedValue([data, 1])

        const returnedValue = await service.overview(query, userId);
        let clients: ClientDto[] = [];
        const clientIds = [];
        data.forEach((project) => {
            if(!clientIds.includes(project.client.id)) {
                clients.push(project.client);
                clientIds.push(project.client.id);
            }
        })
        clients = clients.map((client) => ({
            ...client,
            projects: data.filter((p) => p.client.id === client.id)
        }))

        expect(repo.overview).toHaveBeenCalledWith(query, userId);
        expect(returnedValue.page).toEqual(query.page)
        expect(returnedValue.perPage).toEqual(query.perPage)
        expect(returnedValue.total).toEqual(1)
        expect(returnedValue.data).toEqual(clients)
    });

    it('should get overview no pagination', async () => {
        const query = {} as FindProjectQueryDto;
        const userId = '4567';
        const data: ProjectDto[] = [
            {
                id: '1234',
                projectName: 'Project',
                client: {
                    id: '456',
                    companyName: 'Test',
                    address: 'New York',
                    contacts: []
                }
            },
            {
                id: '456',
                projectName: 'Project 2',
                client: {
                    id: '456',
                    companyName: 'Test',
                    address: 'New York',
                    contacts: []
                }
            },
        ];
        repo.overview.mockResolvedValue([data, 1])

        const returnedValue = await service.overview(query, userId);
        let clients: ClientDto[] = [];
        const clientIds = [];
        data.forEach((project) => {
            if(!clientIds.includes(project.client.id)) {
                clients.push(project.client);
                clientIds.push(project.client.id);
            }
        })
        clients = clients.map((client) => ({
            ...client,
            projects: data.filter((p) => p.client.id === client.id)
        }))

        expect(repo.overview).toHaveBeenCalledWith(query, userId);
        expect(returnedValue.page).toEqual(1)
        expect(returnedValue.perPage).toEqual(20)
        expect(returnedValue.total).toEqual(1)
        expect(returnedValue.data).toEqual(clients)
    });
});
