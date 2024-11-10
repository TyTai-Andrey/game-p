import { initGameState } from './game';

// types
import { SettingsAction, SettingsState } from '../types/settings';
import { CreateSlice } from '../types';

type CreateSettingsSlice = CreateSlice<SettingsState & SettingsAction>;

const createSettingsSlice: CreateSettingsSlice = set => ({
  dashboardSize: 3,
  itemsForWin: 3,
  setSettings: settings => set(({ position }) => {
    const newPosition = settings?.dashboardSize ?
      new Array(settings.dashboardSize ** 2).fill('_').join('') :
      position;

    return {
      ...settings,
      ...initGameState,
      position: newPosition,
    };
  }),
  unfairPlay: false,
});

export default createSettingsSlice;