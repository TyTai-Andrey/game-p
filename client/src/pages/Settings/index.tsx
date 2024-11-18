// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Form, { OnSubmitFormProps } from '@components/Form';
import Buttons from '@pages/Settings/Buttons';
import Checkbox from '@components/Checkbox';
import FormItem from '@components/Form/FormItem';
import Input from '@components/Input';

// styles
import styles from '@pages/Settings/Settings.module.scss';

// store
import { SettingsState } from '@store/types/settings';
import useStore from '@store/index';

// utils
import makeFormStore from '@utils/makeFormStore';

// constants
import pathnames from '@constants/pathnames';

// api

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
}, 'settingsForm');

const formattedValues = (values: any, isOnline?: boolean): SettingsState => ({
  ...values,
  firstTurnSymbol: values.firstTurnSymbol ? 'X' : 'O',
  isOnline: isOnline ?? false,
});

const Settings: FC<Props> = () => {
  const navigate = useNavigate();
  const setValues = useForm(state => state.setValues);
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

  const onChangeItemsForWin = useCallback((value: string | number | boolean) => {
    const { dashboardSize } = useForm.getState().values;
    const newValues = {
      itemsForWin: value,
      ...((Number(dashboardSize) < Number(value)) ?
        { dashboardSize: value } :
        {}),
    };
    setValues(newValues);
  }, []);

  const onChangeDashboardSize = useCallback((value: string | number | boolean) => {
    const { itemsForWin } = useForm.getState().values;
    const newValues = {
      dashboardSize: value,
      ...((Number(itemsForWin) > Number(value)) ?
        { itemsForWin: value } :
        {}),
    };
    setValues(newValues);
  }, []);

  const onSubmit = useCallback(({ values }: OnSubmitFormProps) => {
    setSettings(formattedValues(values));
    navigate(pathnames.main);
  }, []);

  return (
    <Form className={styles.root} form={useForm} onSubmit={onSubmit}>
      <FormItem
        name="dashboardSize"
        onChange={onChangeDashboardSize}
        valueType="number"
      >
        <Input
          label="Размер доски"
          name="dashboardSize"
          type="number"
        />
      </FormItem>
      <FormItem
        name="itemsForWin"
        onChange={onChangeItemsForWin}
        valueType="number"
      >
        <Input
          label="Символов в ряд для победы"
          name="itemsForWin"
          type="number"
        />
      </FormItem>
      <FormItem
        name="unfairPlay"
        valueType="boolean"
      >
        <Checkbox label="Нечестная игра (позволяет ставить фигуру на фигуру противника)" />
      </FormItem>
      <FormItem
        name="firstTurnSymbol"
        valueType="boolean"
      >
        <Checkbox label="Начать за крестики" />
      </FormItem>
      <Buttons form={useForm} formattedValues={formattedValues} />
    </Form>
  );
};

export default Settings;
