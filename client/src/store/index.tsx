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
import createGameSlice from './slices/game';
import createSettingsSlice from './slices/settings';

// types
import { Store } from './types';

const persistBlackList: string[] = [
  ...authBlackList,
];

const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...createAuthSlice(set, get),
        ...createGameSlice(set, get),
        ...createSettingsSlice(set, get),
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
  ),
);

export type { Store };
export default useStore;
