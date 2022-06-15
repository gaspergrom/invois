import { Test, TestingModule } from '@nestjs/testing';
import { AuthData } from '../shared/models/AuthData';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/request/create-client.dto';
import { FindClientsQueryDto } from './dto/request/find-clients-query.dto';
import { UpdateClientDto } from './dto/request/update-client.dto';

describe('Clients Controller', () => {
  const user: AuthData = {
    email: 'gasper.grom@gmail.com',
    id: '1234',
    lastName: 'Grom',
    name: 'Gasper',
    profilePhoto: '',
  };

  let controller: ClientsController;
  const service = {
    create: jest.fn(),
    getOneById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getList: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{ provide: ClientsService, useValue: service }],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', () => {
    const createData = {} as CreateClientDto;

    controller.create(createData, user);

    expect(service.create).toHaveBeenCalledWith(createData, user.id);
  });

  it('should get one', () => {
    const id = '111';

    controller.getOne(id, user);

    expect(service.getOneById).toHaveBeenCalledWith(id, user.id);
  });

  it('should get list', () => {
    const query: FindClientsQueryDto = {};

    controller.list(query, user);

    expect(service.getList).toHaveBeenCalledWith(query, user.id);
  });

  it('should update', () => {
    const updateData = {} as UpdateClientDto;
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
