export interface Client {
  id: string;
  state: ClientState;
  companyName: string;
  country?: string;
  address: string;
  address2?: string;
  addressCity?: string;
  addressPostCode?: string;
  addressState?: string;
  taxIdLabel?: string;
  taxIdNumber?: string;
  contacts?: ClientContact[];
}

export enum ClientState {
  ACTIVE = 'active',
  ARCHIVE = 'archive',
}

export interface ClientContact {
  name?: string;
  email: string;
  phoneNumber?: string;
}

export interface CreateClient extends Client {
  contactEmail: string;
  contactName?: string;
}
