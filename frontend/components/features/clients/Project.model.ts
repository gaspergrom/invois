export interface Project {
  id: string;
  state: ProjectState;
  projectName: string;
  startDate?: Date;
  endDate?: Date;
}

export enum ProjectState {
  ACTIVE = 'active',
  ARCHIVE = 'archive',
}
