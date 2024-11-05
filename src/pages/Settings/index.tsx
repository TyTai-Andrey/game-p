// react
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Input from '@components/Input';

// styles
import styles from '@pages/Settings/Settings.module.scss';

// store
import { SettingsState } from '@store/types/settings';
import useStore from '@store/index';

type Props = {};

const Settings: FC<Props> = () => {
  const navigate = useNavigate();

  const setSettings = useStore(state => state.setSettings);
  const initDashboardSize = useStore(state => state.dashboardSize);
  const [errors, setErrors] = useState<Partial<Record<keyof SettingsState, string | boolean>>>({});
  const [values, setValues] = useState<Pick<SettingsState, 'dashboardSize' | 'unfairPlay'>>({
    dashboardSize: initDashboardSize,
    unfairPlay: false,
  });

  const onChangeNumberValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValues(prev => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const onChangeCheckbox = (value: boolean) => {
    setValues(prev => ({
      ...prev,
      unfairPlay: value,
    }));
  };

  const onClick = () => {
    const dashboardSizeError = ((values.dashboardSize < 3) ||
      (values.dashboardSize > 10)) &&
      'Размер доски должен быть от 3 до 9';
    if (dashboardSizeError) {
      setErrors({ dashboardSize: dashboardSizeError });
      return;
    }
    setSettings(values);
    navigate('/game');
  };

  return (
    <div className={styles.root}>
      <Input
        error={errors.dashboardSize}
        label="Размер доски"
        name="dashboardSize"
        onChange={onChangeNumberValues}
        type="number"
        value={String(values.dashboardSize)}
      />
      <div>
        <Checkbox
          error={errors.unfairPlay}
          label="Нечестная игра (позволяет ставить фигуру на фигуру противника)"
          onChange={onChangeCheckbox}
        />
      </div>
      <Button onClick={onClick}>Начать игру</Button>
    </div>
  );
};

export default Settings;
