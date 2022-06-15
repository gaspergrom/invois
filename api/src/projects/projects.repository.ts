import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { FindProjectQueryDto } from './dto/request/find-project-query.dto';
import {ProjectOverviewQueryDto} from './dto/request/project-overview-query.dto';
import {ProjectDto} from './dto/project.dto';

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  async list(query: FindProjectQueryDto, userId: string): Promise<[Project[], number]> {
    const { perPage, page, searchQuery } = query;
    const take = perPage || 20;
    const skip = (page - 1) * take || 0;

    return this.findAndCount({
      where: {
        projectName:
          searchQuery && searchQuery.length
            ? ILike(`${searchQuery}%`)
            : undefined,
        userId,
      },
      take: take,
      skip: skip,
      relations: {
        user: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async overview(
      query: ProjectOverviewQueryDto,
    userId: string,
  ): Promise<[Project[], number]> {
    const { perPage, page, searchQuery } = query;
    const take = perPage || 20;
    const skip = (page - 1) * perPage || 0;

    return this.findAndCount({
      where: [
        {
          projectName:
            searchQuery && searchQuery.length
              ? ILike(`${searchQuery}%`)
              : undefined,
          userId,
        },
        {
          client: {
            companyName:
              searchQuery && searchQuery.length
                ? ILike(`${searchQuery}%`)
                : undefined,
          },
          userId,
        },
      ],
      take,
      skip,
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
  }
}
