import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export enum EmailTemplates {
  FORGOT_PASSWORD = 'forgot-password',
}

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async send(
    mail: Partial<SendGrid.MailDataRequired>,
    template: EmailTemplates,
    templateData: any,
  ) {
    const tpl = await fs.promises.readFile(
      path.join(__dirname, `../../../email/${template}.hbs`),
      'utf-8',
    );
    const compiledTemplate = Handlebars.compile(tpl);
    const transport = await SendGrid.send({
      from: 'gasper.grom@gmail.com',
      html: compiledTemplate(templateData),
      ...mail,
    });
    return transport.length
      ? Math.floor(transport[0].statusCode / 100) === 2
      : true;
  }
}
