// vendor imports
import { create } from 'zustand';

// constants
import { defaultErrorsForm, defaultValuesForm } from '@constants/form';
import { isBoolean, isNumber } from './type-operations';

type DefaultValidators = 'required';

type FieldValue = string | number | boolean;
type SettingsValue = {
  defaultValidators?: DefaultValidators[];
  valueType: 'string' | 'boolean' | 'number';
  min?: number;
  max?: number;
};

type Settings<T extends string = string> = {
  [key in T]: SettingsValue;
};

const _validateForm = <T extends string>(
  values: Partial<Record<T, FieldValue>>,
  settings: Settings<T>,
) => {
  const errors: Partial<Record<keyof typeof values, string>> = {};

  for (const key in values) {
    const element = values[key];

    if (
      settings[key]?.defaultValidators?.includes('required') &&
      !element &&
      !isBoolean(element) &&
      !isNumber(element)
    ) {
      errors[key] = 'Поле обязательно для заполнения';
    } else if (
      typeof element !== settings[key].valueType &&
      Object.keys(defaultErrorsForm).includes(settings[key].valueType)
    ) {
      errors[key] = defaultErrorsForm[settings[key].valueType];
    } else if (
      isNumber(element) &&
      ((element < (settings?.[key]?.min ?? -Infinity)) ||
        (element > (settings?.[key]?.max ?? Infinity)))
    ) {
      const hasMin = settings?.[key]?.min ? ` от ${settings[key].min}` : '';
      const hasMax = settings?.[key]?.max ? ` до ${settings[key].max}` : '';
      errors[key] = `Значение должно быть${hasMin}${hasMax}`;
    } else {
      delete errors[key];
    }
  }

  return { errors, isValid: !Object.keys(errors).length };
};

const _createValues = <T extends string>(settings: Settings<T>) => {
  type Values = Record<T, FieldValue>;
  const values: Partial<Values> = {};

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in settings) {
    if (Object.keys(defaultValuesForm).includes(settings[key].valueType)) {
      values[key] = defaultValuesForm[settings[key].valueType];
    }
  }

  return values;
};

const makeFormStore = <T extends string>(settings: Settings<T>) => {
  type Values = Record<T, FieldValue>;
  type Errors = Record<T, string | boolean>;

  type Store = {
    errors: Partial<Errors>;
    isValid: boolean;
    clearErrors: (errors: Errors) => void;
    setValues: (value: { [key in keyof Values]?: Values[key] }) => void;
    values: Values;
    validate: () => void;
  };

  const values = _createValues<T>(settings);

  return create<Store>(set => ({
    clearErrors: () => set({ errors: {} }),
    errors: {},
    isValid: true,
    setValues: newValues => set(({ values }) => {
      const { errors, isValid } = _validateForm(newValues, settings);

      return {
        errors,
        isValid,
        values: { ...values, ...newValues },
      };
    }),
    validate: () => set(({ values }) => _validateForm(values, settings)),
    values: values as Values,
  }));
};

export default makeFormStore;
