import {ClientDto} from '../../clients/dto/client.dto';

export interface ProjectDto {
  id: string;
  projectName: string;
  startDate?: Date;
  endDate?: Date;
  client?: ClientDto,
}
