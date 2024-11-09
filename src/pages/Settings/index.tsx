// vendor imports
import { useShallow } from 'zustand/react/shallow';

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
  itemsForWin: { defaultValidators: ['required'], valueType: 'number' },
  unfairPlay: { defaultValidators: ['required'], valueType: 'boolean' },
});

const Settings: FC<Props> = () => {
  const navigate = useNavigate();
  const { errors, isValid, setValues, values } = useForm(useShallow(
    ({ errors, isValid, setValues, values }) => ({ errors, isValid, setValues, values }),
  ));
  const {
    dashboardSize: initDashboardSize,
    setSettings,
    itemsForWin: initItemsForWin,
  } = useStore(useShallow(
    ({
      dashboardSize,
      setSettings,
      itemsForWin,
    }) => ({
      dashboardSize,
      setSettings,
      itemsForWin,
    }),
  ));

  useEffect(() => {
    setValues({
      dashboardSize: initDashboardSize,
      itemsForWin: initItemsForWin,
    });
  }, [initDashboardSize, initItemsForWin]);

  const onChangeItemsForWin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newValues = {
      itemsForWin: value,
      ...((Number(values.dashboardSize) < value) ?
        { dashboardSize: value } :
        {}),
    };
    setValues(newValues);
  };

  const onChangeDashboardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const newValues = {
      dashboardSize: value,
      ...((Number(values.itemsForWin) > value) ?
        { itemsForWin: value } :
        {}),
    };
    setValues(newValues);
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
        onChange={onChangeDashboardSize}
        type="number"
        value={String(values.dashboardSize)}
      />
      <Input
        error={errors.itemsForWin}
        label="Символов в ряд для победы"
        name="itemsForWin"
        onChange={onChangeItemsForWin}
        type="number"
        value={String(values.itemsForWin)}
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
