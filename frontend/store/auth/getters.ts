import { AuthState } from './state';

export enum AuthGetters {
  TOKEN = 'TOKEN',
  USER = 'USER',
}

export default {
  [AuthGetters.TOKEN]: (state: AuthState) => state.token,
  [AuthGetters.USER]: (state: AuthState) => state.user,
};
