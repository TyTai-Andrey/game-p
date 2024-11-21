// vendor imports
import classNames from 'classnames';

// react
import React, { useCallback, useEffect } from 'react';

// utils
import { FormType, FormValues } from '@utils/makeFormStore';

// styles
import styles from '@components/Form/Form.module.scss';

// components
import FormItem from '@components/Form/FormItem';
import FormProvider from '../providers/FormProvider';

type OnSubmitFormProps<T extends FormType> = {
  event: React.FormEvent<HTMLFormElement>,
  values: FormValues<T>,
};

export interface FormProps<T extends FormType> {
  children: React.ReactNode,
  className?: string,
  onSubmit?: (props: OnSubmitFormProps<T>) => void,
  form?: T
  initFormValues?: Partial<FormValues<T>>,
}

const Form = <T extends FormType>({
  children,
  className,
  onSubmit,
  initFormValues,
  form,
}: FormProps<T>) => {
  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form?.getState()?.validate?.();
    if (!form?.getState()?.isValid) return;

    const { values } = form?.getState() ?? { values: {} };
    if (onSubmit) onSubmit({ event, values });
  }, [onSubmit]);

  useEffect(() => {
    if (initFormValues && form) {
      form.getState().setValues(initFormValues);
    }
  }, [initFormValues]);

  useEffect(() => {
    return () => {
      form?.getState()?.clearForm?.();
    };
  }, []);

  if (form) {
    return (
      <FormProvider form={form}>
        <form
          className={classNames(styles.root, className)}
          onSubmit={onSubmitHandler}
        >
          {children}
        </form>
      </FormProvider>
    );
  }

  return (
    <form
      className={classNames(styles.root, className)}
      onSubmit={onSubmitHandler}
    >
      {children}
    </form>
  );
};

Form.Item = FormItem;

export type { OnSubmitFormProps };
export default Form;
