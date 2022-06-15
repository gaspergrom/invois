import { User } from '~/components/features/auth/auth.model';
import { AuthState } from './state';

export enum AuthMutations {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

const mutations: Record<AuthMutations, (state: AuthState) => void> = {
  [AuthMutations.SET_TOKEN]: (state: AuthState, token?: string) => {
    state.token = token || null;
  },
  [AuthMutations.SET_USER]: (state: AuthState, user?: User) => {
    state.user = user || null;
  },
  [AuthMutations.LOGOUT]: (state: AuthState) => {
    state.token = null;
    state.user = null;
  },
};

export default mutations;
