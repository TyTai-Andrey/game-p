// vendor imports
import { useShallow } from 'zustand/react/shallow';

// react
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Form, { OnSubmitFormProps } from '@components/Form';
import Buttons from '@pages/Settings/Buttons';
import Checkbox from '@components/Checkbox';
import Input from '@components/Input';

// styles
import styles from '@pages/Settings/Settings.module.scss';

// store
import { SettingsState } from '@store/types/settings';
import useStore from '@store/index';

// utils
import { FieldFormValue, SettingsForm } from '@utils/makeFormStore';

// constants
import pathnames from '@constants/pathnames';

// hooks
import useForm from '@hooks/useForm';

type Props = {};

const formSettings: SettingsForm = {
  dashboardSize: {
    defaultValidators: ['required'],
    max: 9,
    min: 3,
    valueType: 'number',
  },
  itemsForWin: { defaultValidators: ['required'], valueType: 'number' },
  unfairPlay: { defaultValidators: ['required'], valueType: 'boolean' },
  firstTurnSymbol: { initValue: true, defaultValidators: ['required'], valueType: 'boolean' },
};

const formattedValues = (values: any, isOnline?: boolean): SettingsState => ({
  ...values,
  firstTurnSymbol: values.firstTurnSymbol ? 'X' : 'O',
  isOnline: isOnline ?? false,
});

const Settings: FC<Props> = () => {
  const form = useForm('settingsForm', formSettings);
  const navigate = useNavigate();
  const setValues = form(state => state.setValues);
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

  const onChangeItemsForWin = useCallback((value: FieldFormValue) => {
    const { dashboardSize } = form.getState().values;
    const newValues = {
      itemsForWin: value,
      ...((Number(dashboardSize) < Number(value)) ?
        { dashboardSize: value } :
        {}),
    };
    setValues(newValues);
  }, []);

  const onChangeDashboardSize = useCallback((value: FieldFormValue) => {
    const { itemsForWin } = form.getState().values;
    const newValues = {
      dashboardSize: value,
      ...((Number(itemsForWin) > Number(value)) ?
        { itemsForWin: value } :
        {}),
    };
    setValues(newValues);
  }, []);

  const onSubmit = useCallback(({ values }: OnSubmitFormProps<typeof form>) => {
    setSettings(formattedValues(values));
    navigate(pathnames.main);
  }, []);

  return (
    <Form
      className={styles.root}
      form={form}
      initFormValues={initFormValues}
      onSubmit={onSubmit}
    >
      <Form.Item
        name="dashboardSize"
        onChange={onChangeDashboardSize}
        valueType="number"
      >
        <Input
          label="Размер доски"
          name="dashboardSize"
          type="number"
        />
      </Form.Item>
      <Form.Item
        name="itemsForWin"
        onChange={onChangeItemsForWin}
        valueType="number"
      >
        <Input
          label="Символов в ряд для победы"
          name="itemsForWin"
          type="number"
        />
      </Form.Item>
      <Form.Item
        name="unfairPlay"
        valueType="boolean"
      >
        <Checkbox label="Нечестная игра (позволяет ставить фигуру на фигуру противника)" />
      </Form.Item>
      <Form.Item
        name="firstTurnSymbol"
        valueType="boolean"
      >
        <Checkbox label="Начать за крестики" />
      </Form.Item>
      <Buttons formattedValues={formattedValues} />
    </Form>
  );
};

export default Settings;
