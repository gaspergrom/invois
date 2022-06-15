import {Test, TestingModule} from '@nestjs/testing';
import {EmailService, EmailTemplates} from './email.service';
import * as SendGrid from '@sendgrid/mail';
import {ConfigService} from '@nestjs/config';
import Handlebars from 'handlebars';
import {Repository} from 'typeorm';
import {Transaction} from '../../transactions/entities/transaction.entity';

jest.mock('Handlebars', () => {
  return {
    compile: jest.fn(),
  };
});

describe('Email service', () => {

  let service: EmailService;
  let config = {
    get: jest.fn().mockResolvedValue('SG.1234')
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, {
        provide: ConfigService, useValue: config,
      }],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send', () => {
    const mailData: Partial<SendGrid.MailDataRequired> = {
      to: 'gasper.grom@gmail.com',
      subject: 'Some subject',
    };

    service.send(mailData, EmailTemplates.FORGOT_PASSWORD, {
      url: 'https://google.com'
    });
  });
});
