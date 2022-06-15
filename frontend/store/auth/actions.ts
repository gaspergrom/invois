import { API_SERVICE } from '~/components/shared/services/api.service';
import { AuthLoginData, AuthRegisterData, User } from '~/components/features/auth/auth.model';
import { AuthMutations } from './mutations';

export enum AuthActions {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOAD_USER = 'LOAD_USER',
  UPDATE_USER = 'UPDATE_USER',
  SOCIAL_CALLBACK = 'SOCIAL_CALLBACK',
  LOGOUT = 'LOGOUT',
}

export default {
  [AuthActions.LOGIN]: ({ dispatch }: any, data: AuthLoginData) => API_SERVICE.auth.login(data)
    .then(({ token }) => {
      API_SERVICE.setToken(token);
      return dispatch(AuthActions.LOAD_USER);
    }),
  [AuthActions.REGISTER]: ({ dispatch }: any, data: AuthRegisterData) => API_SERVICE.auth.register(data)
    .then(() => dispatch(AuthActions.LOGIN, {
      email: data.email,
      password: data.password,
    })),
  [AuthActions.LOAD_USER]: ({ commit }: any) => API_SERVICE.auth.getUser()
    .then((user: User | null) => {
      commit(AuthMutations.SET_USER, user);
      return Promise.resolve(user);
    }),
  [AuthActions.UPDATE_USER]: ({ commit }: any, data: Partial<User>) => API_SERVICE.auth.updateUser(data)
    .then((user: User | null) => {
      commit(AuthMutations.SET_USER, user);
      return Promise.resolve(user);
    }),
  [AuthActions.SOCIAL_CALLBACK]: ({ dispatch }: any, data: { platform: string, params: any }) => API_SERVICE.auth.socialLoginCallback(data.platform, data.params)
    .then(({ token }) => {
      API_SERVICE.setToken(token);
      return dispatch(AuthActions.LOAD_USER);
    }),
  [AuthActions.LOGOUT]: ({ commit }: any) => {
    commit(AuthMutations.LOGOUT);
    API_SERVICE.setToken(null);
  },
};
