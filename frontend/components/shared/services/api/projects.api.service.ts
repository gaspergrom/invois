import { AxiosInstance } from 'axios';
import { Project } from '~/components/features/clients/Project.model';
import { Pagination } from '~/components/shared/models/Pagination';

export class ProjectsApiService {
  baseUrl: string = '';

  constructor(private http: AxiosInstance) {
    this.baseUrl = process.env.apiUrl || '';
  }

  getProjects(page: number = 1): Promise<Pagination<Project>> {
    return this.http.get('/projects', {
      params: {
        page,
        perPage: 15,
      },
    });
  }

  createProject(data: Partial<Project>): Promise<Project> {
    return this.http.post('/projects', data);
  }

  updateProject(id: string, data: Partial<Project>): Promise<Project> {
    return this.http.patch(`/projects/${id}`, data);
  }

  deleteProject(id: string): Promise<void> {
    return this.http.delete(`/projects/${id}`);
  }
}
