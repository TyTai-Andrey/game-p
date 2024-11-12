// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC, useCallback, useEffect } from 'react';
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
import isResponse from '@utils/check-types';
import makeFormStore from '@utils/makeFormStore';

// constants
import pathnames from '@constants/pathnames';

// api
import GameApi from '@api/GameApi';

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
  firstTurnSymbol: { initValue: true, defaultValidators: ['required'], valueType: 'boolean' },
});

const formattedValues = (values: any, isOnline?: boolean): SettingsState => ({
  ...values,
  firstTurnSymbol: values.firstTurnSymbol ? 'X' : 'O',
  isOnline: isOnline ?? false,
});

const Settings: FC<Props> = () => {
  const navigate = useNavigate();
  const { errors, isValid, setValues, values } = useForm(useShallow(
    ({ errors, isValid, setValues, values }) => ({ errors, isValid, setValues, values }),
  ));
  const setSettings = useStore(state => state.setSettings);
  const initFormValues = useStore(useShallow(
    ({
      dashboardSize,
      itemsForWin,
      unfairPlay,
    }) => ({
      dashboardSize,
      itemsForWin,
      unfairPlay,
    }),
  ));

  useEffect(() => {
    setValues(initFormValues);
  }, [initFormValues]);

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

  const onChangeUnfairPlay = useCallback((value: boolean) => {
    setValues({ unfairPlay: value });
  }, [setValues]);

  const onChangeFirstTurnSymbol = useCallback((value: boolean) => {
    setValues({ firstTurnSymbol: value });
  }, [setValues]);

  const onSubmit = () => {
    if (isValid) {
      setSettings(formattedValues(values));
      navigate(pathnames.main);
    }
  };

  const onCreateGame = async () => {
    const response = await GameApi.create(formattedValues(values));

    if (isResponse(response)) {
      setSettings(formattedValues(values, true));
      navigate(`${pathnames.main}?gameId=${response.gameId}`);
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
          defaultChecked={Boolean(values.unfairPlay)}
          error={errors.unfairPlay}
          label="Нечестная игра (позволяет ставить фигуру на фигуру противника)"
          onChange={onChangeUnfairPlay}
        />
      </div>
      <div>
        <Checkbox
          defaultChecked={Boolean(values.firstTurnSymbol)}
          error={errors.firstTurnSymbol}
          label="Начать за крестики"
          onChange={onChangeFirstTurnSymbol}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="submit">Начать игру</Button>
        <Button onClick={onCreateGame} type="button">Начать игру с другом</Button>
      </div>
    </Form>
  );
};

export default Settings;
