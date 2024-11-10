type SettingsState = {
  dashboardSize: number
  itemsForWin: number
  unfairPlay: boolean
};

type SettingsAction = {
  setSettings: (settings: Partial<SettingsState>) => void
};

export type {
  SettingsAction,
  SettingsState,
};
