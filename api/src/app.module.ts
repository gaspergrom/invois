import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './shared/services/email.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { FacebookStrategy } from './auth/strategies/facebook.strategy';
import { LinkedinStrategy } from './auth/strategies/linkedin.strategy';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { Client } from './clients/entities/client.entity';
import { Project } from './projects/entities/project.entity';
import { ProjectsModule } from './projects/projects.module';
import {Transaction} from './transactions/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const options: any = {
          type: 'postgres',
          database: 'invois',
          host: 'localhost',
          port: '5432',
          username: 'invois',
          password: 'invois',
          synchronize: true,
          logging: false,
          entities: [User, Client, Project, Transaction],
          migrations: ['src/migrations/**/*.ts'],
        };
        return options;
      },
    }),
    PassportModule,
    AuthModule,
    ClientsModule,
    ProjectsModule,
  ],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    LinkedinStrategy,
    EmailService,
    ConfigService,
  ],
})
export class AppModule {}
