import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Pagination } from '../shared/models/Pagination';
import { Auth, AuthUser } from '../shared/decorators/auth.decorator';
import { ProjectDto } from './dto/project.dto';
import { CreateProjectDto } from './dto/request/create-project.dto';
import { AuthData } from '../shared/models/AuthData';
import { FindProjectQueryDto } from './dto/request/find-project-query.dto';
import {ProjectOverviewQueryDto} from './dto/request/project-overview-query.dto';
import {ApiTags} from '@nestjs/swagger';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Auth()
  @Post('')
  create(
    @Body() body: CreateProjectDto,
    @AuthUser() user: AuthData,
  ): Promise<ProjectDto> {
    return this.projectsService.create(body, user.id);
  }

  @Auth()
  @Get('/:id')
  getOne(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<ProjectDto> {
    return this.projectsService.getOneById(id, user.id);
  }

  @Auth()
  @Get('')
  list(
    @Query() query: FindProjectQueryDto,
    @AuthUser() user: AuthData,
  ): Promise<Pagination<ProjectDto>> {
    return this.projectsService.getList(query, user.id);
  }

  @Auth()
  @Get('/overview')
  overview(
    @Query() query: ProjectOverviewQueryDto,
    @AuthUser() user: AuthData,
  ): Promise<any> {
    return this.projectsService.overview(query, user.id);
  }

  @Auth()
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<ProjectDto>,
    @AuthUser() user: AuthData,
  ): Promise<ProjectDto> {
    return this.projectsService.update(id, body, user.id);
  }

  @Auth()
  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @AuthUser() user: AuthData,
  ): Promise<boolean> {
    return this.projectsService.delete(id, user.id);
  }
}
