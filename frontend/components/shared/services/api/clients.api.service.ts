import { AxiosInstance } from 'axios';
import {Client, CreateClient} from '~/components/features/clients/Client.model';

export class ClientsApiService {
  baseUrl: string = '';

  constructor(private http: AxiosInstance) {
    this.baseUrl = process.env.apiUrl || '';
  }

  getClients(page: number = 1, perPage: number = 15): Promise<any> {
    return this.http.get('/clients', {
      params: {
        page,
        perPage,
      },
    });
  }

  createClient(data: Partial<CreateClient>): Promise<any> {
    return this.http.post('/clients', data);
  }

  updateClient(id: string, data: Partial<CreateClient>): Promise<any> {
    return this.http.patch(`/clients/${id}`, data);
  }

  deleteClient(id: string): Promise<any> {
    return this.http.delete(`/clients/${id}`);
  }
}
