// react
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '@components/Button';

// styles
import styles from '@pages/Settings/Settings.module.scss';

// constants
import pathnames from '@constants/pathnames';

// api
import GameApi from '@api/GameApi';

// utils
import { FormType } from '@utils/makeFormStore';
import isResponse from '@utils/check-types';

// store
import { SettingsState } from '@store/types/settings';
import useStore from '@store/index';

type Props = {
  formattedValues: (values: any, isOnline?: boolean) => SettingsState
  form: FormType
};

const Buttons: FC<Props> = ({ formattedValues, form }) => {
  const navigate = useNavigate();
  const setSettings = useStore(state => state.setSettings);
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const onCreateGame = useCallback(async () => {
    const { values } = form.getState();
    const response = await GameApi.create(formattedValues(values));

    if (isResponse(response)) {
      setSettings(formattedValues(values, true));
      navigate(`${pathnames.onlineGame}${response.gameId}`);
    }
  }, []);
  return (
    <div className={styles.buttons}>
      <Button type="submit">Начать игру</Button>
      <Button
        disabled={!isAuthenticated}
        onClick={onCreateGame}
        type="button"
      >Начать игру с другом
      </Button>
    </div>
  );
};

export default Buttons;
