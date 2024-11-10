import { AuthAction, AuthState } from './auth';
import { GameAction, GameState } from './game';
import { SettingsAction, SettingsState } from './settings';

type State = GameState & SettingsState & AuthState;

type Action = GameAction & SettingsAction & AuthAction;

type Store = State & Action;

type CreateSlice<T> = (
  set: (partial: Partial<Store> | ((state: Store) => Partial<Store>)) => void,
  get: () => Store
) => T;

export type {
  Action,
  CreateSlice,
  State,
  Store,
};
