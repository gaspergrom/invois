import { TransactionsService } from './transactions.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthData } from '../shared/models/AuthData';
import {TransactionsController} from './transactions.controller';
import {CreateTransactionDto} from './dto/request/create-transaction.dto';
import {FindTransactionQueryDto} from './dto/request/find-transaction-query.dto';

describe('Transactions Controller', () => {
  const user: AuthData = {
    email: 'gasper.grom@gmail.com',
    id: '1234',
    lastName: 'Grom',
    name: 'Gasper',
    profilePhoto: '',
  };

  let controller: TransactionsController;
  const service = {
    create: jest.fn(),
    getOneById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getList: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [{ provide: TransactionsService, useValue: service }],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', () => {
    const createData = {} as CreateTransactionDto;

    controller.create(createData, user);

    expect(service.create).toHaveBeenCalledWith(createData, user.id);
  });

  it('should get one', () => {
    const id = '111';

    controller.getOne(id, user);

    expect(service.getOneById).toHaveBeenCalledWith(id, user.id);
  });

  it('should get list', () => {
    const query: FindTransactionQueryDto = {};

    controller.list(query, user);

    expect(service.getList).toHaveBeenCalledWith(query, user.id);
  });

  it('should update', () => {
    const updateData = {} as CreateTransactionDto;
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
