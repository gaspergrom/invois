import { User } from '~/components/features/auth/auth.model';

export interface AuthState {
  token: string | null,
  user: User | null
}

const state: () => AuthState = () => ({
  token: null,
  user: null,
});

export default state;
