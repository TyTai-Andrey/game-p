// react
import { FC, cloneElement, isValidElement, memo, useCallback, useContext, useMemo } from 'react';

// utils
import { FieldFormValue, FormType, SettingsForm } from '@utils/makeFormStore';
import { FormContext } from '../../providers/FormProvider';

type Props = {
  children: React.ReactNode;
  form?: FormType
  name: string
  dataType?: string
  valueType?: SettingsForm[string]['valueType']
  onChange?: (value: FieldFormValue) => void
  needValidate?: boolean
};

const FormItem: FC<Props> & { dataType?: string } = memo(({
  children,
  name,
  valueType,
  onChange,
  needValidate,
}) => {
  const { form } = useContext(FormContext);
  const value = form?.(state => state.values[name]);
  const error = form?.(state => state.errors[name]);
  const setValues = form?.(state => state.setValues);
  const setErrors = form?.(state => state.setErrors);

  const _onChange = useCallback((value: FieldFormValue) => {
    const isValid = form?.getState()?.isValid ?? true;
    if (!isValid) setErrors?.({ [name]: '' });
    if (onChange) {
      onChange(value);
    } else {
      setValues?.({ [name]: value }, needValidate);
    }
  }, [
    name,
    needValidate,
    onChange,
    setErrors,
    setValues,
  ]);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = valueType === 'number' ? Number(e.target.value) : e.target.value;

    _onChange(value);
  }, [_onChange, valueType]);

  const onChangeBooleanHandler = useCallback((value: boolean) => {
    _onChange(value);
  }, [_onChange]);

  const element = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ...(children.props ?? {}),
        value,
        defaultChecked: value,
        error,
        onChange: valueType === 'boolean' ? onChangeBooleanHandler : onChangeHandler,
      });
    }
    return null;
  }, [children, error, onChangeBooleanHandler, onChangeHandler, value, valueType]);

  return element;
}, (prevProps, nextProps) => prevProps.name === nextProps.name);

export default FormItem;
