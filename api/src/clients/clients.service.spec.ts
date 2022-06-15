import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/request/create-client.dto';
import { HttpStatus } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/request/update-client.dto';
import { FindClientsQueryDto } from './dto/request/find-clients-query.dto';

describe('Clients Service', () => {
  let service: ClientsService;
  const repo = {
    save: jest.fn(),
    findOneByOrFail: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: ClientsRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const createData: CreateClientDto = {
      companyName: 'Gasper Grom s.p.',
      address: 'Brezje',
      contactEmail: 'gasper.grom@gmail.com',
    };
    const userId = '1234';

    await service.create(createData, userId);

    expect(repo.save).toHaveBeenCalledWith({
      ...createData,
      contacts: [
        {
          name: createData.contactName,
          email: createData.contactEmail,
        },
      ],
      userId,
    });
  });

  it('should find one by id', async () => {
    const client = {
      id: '1234',
    } as Client;
    const clientId = '456';
    const userId = '1234';
    repo.findOneByOrFail.mockResolvedValue(client);

    const returnedClient = await service.getOneById(clientId, userId);

    expect(repo.findOneByOrFail).toHaveBeenCalledWith({
      id: clientId,
      userId,
    });
    expect(returnedClient).toEqual(client);
  });

  it('should throw error if client doesnt exist', async () => {
    const clientId = '456';
    const userId = '1234';
    repo.findOneByOrFail.mockResolvedValue(null);

    try {
      await service.getOneById(clientId, userId);
    } catch (e) {
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
      expect(repo.findOneByOrFail).toHaveBeenCalledWith({
        id: clientId,
        userId,
      });
    }
  });

  it('should update', async () => {
    const client = {
      id: '1234',
    } as Client;
    const clientId = '456';
    const userId = '1234';
    const updateData: UpdateClientDto = {
      companyName: 'Gasper Grom s.p.',
      address: 'Brezje',
      contacts: [],
    };
    repo.findOneByOrFail.mockResolvedValue(client);

    await service.update(clientId, updateData, userId);

    expect(repo.findOneByOrFail).toHaveBeenCalledWith({
      id: clientId,
      userId,
    });
    expect(repo.update).toHaveBeenCalledWith(clientId, updateData);
  });

  it('should throw error on update if client does not exist', async () => {
    const clientId = '456';
    const userId = '1234';
    const updateData: UpdateClientDto = {
      companyName: 'Gasper Grom s.p.',
      address: 'Brezje',
      contacts: [],
    };
    repo.findOneByOrFail.mockResolvedValue(null);

    try {
      await service.update(clientId, updateData, userId);
    } catch (e) {
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
      expect(repo.findOneByOrFail).toHaveBeenCalledWith({
        id: clientId,
        userId,
      });
    }
  });

  it('should delete', async () => {
    const client = {
      id: '1234',
    } as Client;
    const clientId = '456';
    const userId = '1234';
    repo.findOneByOrFail.mockResolvedValue(client);

    await service.delete(clientId, userId);

    expect(repo.findOneByOrFail).toHaveBeenCalledWith({
      id: clientId,
      userId,
    });
    expect(repo.softDelete).toHaveBeenCalledWith(clientId);
  });

  it('should throw error on update if client does not exist', async () => {
    const clientId = '456';
    const userId = '1234';
    repo.findOneByOrFail.mockResolvedValue(null);

    try {
      await service.delete(clientId, userId);
    } catch (e) {
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
      expect(repo.findOneByOrFail).toHaveBeenCalledWith({
        id: clientId,
        userId,
      });
    }
  });

  it('should list', async () => {
    const query: FindClientsQueryDto = {};
    const userId = '1234';
    repo.list.mockResolvedValue([[], 0]);

    const { data, total, page, perPage } = await service.getList(query, userId);

    expect(repo.list).toHaveBeenCalledWith(query, userId);
    expect(data).toEqual([]);
    expect(total).toEqual(0);
    expect(page).toEqual(1);
    expect(perPage).toEqual(20);
  });
});
