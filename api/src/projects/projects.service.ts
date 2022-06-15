import {Injectable, NotFoundException} from '@nestjs/common';
import {ProjectsRepository} from './projects.repository';
import {ProjectDto} from './dto/project.dto';
import {Pagination} from '../shared/models/Pagination';
import {CreateProjectDto} from './dto/request/create-project.dto';
import {FindProjectQueryDto} from './dto/request/find-project-query.dto';
import {Client} from '../clients/entities/client.entity';
import {ClientDto} from '../clients/dto/client.dto';

@Injectable()
export class ProjectsService {
    constructor(private readonly repo: ProjectsRepository) {
    }

    async create(data: CreateProjectDto, userId: string): Promise<ProjectDto> {
        return await this.repo.save({
            ...data,
            userId,
        });
    }

    async getOneById(id: string, userId: string): Promise<ProjectDto> {
        return await this.repo.findOneByOrFail({
            id,
            userId,
        });
    }

    async update(
        id: string,
        data: Partial<ProjectDto>,
        userId: string,
    ): Promise<ProjectDto> {
        await this.repo.findOneByOrFail({
            id,
            userId,
        });
        await this.repo.update(id, data);
        return await this.repo.findOneByOrFail({
            id,
            userId,
        });
    }

    async delete(id: string, userId: string): Promise<boolean> {
        await this.repo.findOneByOrFail({
            id,
            userId,
        });
        await this.repo.delete(id);
        return true;
    }

    async getList(
        query: FindProjectQueryDto,
        userId: string,
    ): Promise<Pagination<ProjectDto>> {
        const [data, total] = await this.repo.list(query, userId);
        return {
            total,
            page: query.page || 1,
            perPage: query.perPage || 20,
            data,
        };
    }

    async overview(
        query: FindProjectQueryDto,
        userId: string,
    ): Promise<Pagination<ClientDto>> {
        const [data, total] = await this.repo.overview(query, userId);
        let clients: Client[] = [];
        const clientIds = [];
        data.forEach((project) => {
            if (!clientIds.includes(project.client.id)) {
                clients.push(project.client);
                clientIds.push(project.client.id);
            }
        })
        clients = clients.map((client) => ({
            ...client,
            projects: data.filter((p) => p.client.id === client.id)
        }))
        return {
            total,
            page: query.page || 1,
            perPage: query.perPage || 20,
            data: clients,
        };
    }
}
