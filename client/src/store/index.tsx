// vendor imports
import {
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import { create } from 'zustand';

// constants
import { currentVersion, migrateVersions } from '../constants/versions';

// utilities
import transformVersionToNumber from '../utils/transformVersionToNumber';

// slices
import createAuthSlice, { authBlackList } from './slices/auth';
import createSettingsSlice, { settingsBlackList } from './slices/settings';
import createGameSlice from './slices/game';

// types
import { Store } from './types';

const persistBlackList: string[] = [
  ...authBlackList,
  ...settingsBlackList,
];

const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...createGameSlice(set, get),
        ...createSettingsSlice(set, get),
        ...createAuthSlice(set, get),
        setState: newState => set(state => ({
          ...state,
          ...newState,
        })),
      }),
      {
        migrate: (persistedState, version) => {
          if (version <= migrateVersions.refactoringSomething) {
            // какие-то изменения
          }

          return persistedState;
        },
        name: 'persist-store',
        partialize: state => Object.fromEntries(
          Object.entries(state).filter(([key]) => !persistBlackList.includes(key)),
        ),
        storage: createJSONStorage(() => localStorage),
        version: transformVersionToNumber(currentVersion),
      },
    ),
    { name: 'mainStore' },
  ),
);

export type { Store };
export default useStore;
