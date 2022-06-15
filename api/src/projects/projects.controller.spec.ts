import { ProjectsService } from './projects.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { AuthData } from '../shared/models/AuthData';
import { FindProjectQueryDto } from './dto/request/find-project-query.dto';
import {ProjectOverviewQueryDto} from './dto/request/project-overview-query.dto';

describe('Projects Controller', () => {
  const user: AuthData = {
    email: 'gasper.grom@gmail.com',
    id: '1234',
    lastName: 'Grom',
    name: 'Gasper',
    profilePhoto: '',
  };

  let controller: ProjectsController;
  const service = {
    create: jest.fn(),
    getOneById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getList: jest.fn(),
    overview: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: service }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', () => {
    const createData = {} as CreateProjectDto;

    controller.create(createData, user);

    expect(service.create).toHaveBeenCalledWith(createData, user.id);
  });

  it('should get one', () => {
    const id = '111';

    controller.getOne(id, user);

    expect(service.getOneById).toHaveBeenCalledWith(id, user.id);
  });

  it('should get list', () => {
    const query: FindProjectQueryDto = {};

    controller.list(query, user);

    expect(service.getList).toHaveBeenCalledWith(query, user.id);
  });

  it('should get overview', () => {
    const query: ProjectOverviewQueryDto = {};

    controller.overview(query, user);

    expect(service.overview).toHaveBeenCalledWith(query, user.id);
  });

  it('should update', () => {
    const updateData = {} as CreateProjectDto;
    const id = '111';

    controller.update(id, updateData, user);

    expect(service.update).toHaveBeenCalledWith(id, updateData, user.id);
  });

  it('should delete', () => {
    const id = '111';

    controller.delete(id, user);

    expect(service.delete).toHaveBeenCalledWith(id, user.id);
  });
});
