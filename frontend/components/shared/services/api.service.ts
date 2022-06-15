import axios, { AxiosInstance } from 'axios';
import { AuthApiService } from '~/components/shared/services/api/auth.api.service';
import { Localstorage } from '~/components/shared/constants/localstorage';
import { ClientsApiService } from '~/components/shared/services/api/clients.api.service';
import {ProjectsApiService} from "~/components/shared/services/api/projects.api.service";

class ApiService {
  http: AxiosInstance;

  baseUrl: string = '';

  token: string | null = null;

  auth: AuthApiService;

  clients: ClientsApiService;

  projects: ProjectsApiService;

  constructor() {
    this.baseUrl = process.env.apiUrl || '';

    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });

    this.http.interceptors.request.use((config) => {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${this.getToken}`;
      return config;
    });

    this.http.interceptors.response.use((response) => response.data, (error) => {
      if (error.response!.status === 401) {
        this.setToken(null);
      }
      return Promise.reject({
        response: error.response,
        data: error.response.data,
        message: 'There was an error! Please contact support',
      });
    });

    this.auth = new AuthApiService(this.http);
    this.clients = new ClientsApiService(this.http);
    this.projects = new ProjectsApiService(this.http);
  }

  get getToken() {
    if (this.token) {
      return this.token;
    }
    const lsToken = localStorage.getItem(Localstorage.TOKEN);
    return lsToken || null;
  }

  public setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem(Localstorage.TOKEN, token);
    } else {
      localStorage.removeItem(Localstorage.TOKEN);
    }
  }
}

export const API_SERVICE = new ApiService();
