// react
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Form from '@components/Form';
import Input from '@components/Input';

// styles
import styles from '@pages/Settings/Settings.module.scss';

// store
import { SettingsState } from '@store/types/settings';
import useStore from '@store/index';

// utils
import makeFormStore from '@utils/makeFormStore';

type Props = {};

const useForm = makeFormStore({
  dashboardSize: {
    defaultValidators: ['required'],
    max: 9,
    min: 3,
    valueType: 'number',
  },
  unfairPlay: { defaultValidators: ['required'], valueType: 'boolean' },
});

const Settings: FC<Props> = () => {
  const navigate = useNavigate();

  const setSettings = useStore(state => state.setSettings);
  const initDashboardSize = useStore(state => state.dashboardSize);

  const isValid = useForm(state => state.isValid);
  const values = useForm(state => state.values);
  const errors = useForm(state => state.errors);
  const setValues = useForm(state => state.setValues);

  useEffect(() => {
    setValues({ dashboardSize: initDashboardSize });
  }, [initDashboardSize]);

  const onChangeNumberValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setValues({ [e.target.name]: value });
  };

  const onChangeCheckbox = (value: boolean) => {
    setValues({ unfairPlay: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (isValid) {
      setSettings(values as SettingsState);
      navigate('/');
    }
  };

  return (
    <Form className={styles.root} onSubmit={onSubmit}>
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
      <Button onClick={onSubmit}>Начать игру</Button>
    </Form>
  );
};

export default Settings;
