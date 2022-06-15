import auth from './auth';
import globals from './globals';

export enum StoreNamespace {
  AUTH = 'auth',
  GLOBALS = 'globals',
}

export default {
  strict: false,
  modules: {
    [StoreNamespace.AUTH]: auth,
    [StoreNamespace.GLOBALS]: globals,
  },
};
