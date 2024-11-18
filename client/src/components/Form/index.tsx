// vendor imports
import classNames from 'classnames';

// react
import React, { useCallback, useEffect, useMemo } from 'react';

// utils
import { FormType } from '@utils/makeFormStore';
import addExtraPropsChildren from '@utils/addExtraPropsChildren';

// styles
import styles from '@components/Form/Form.module.scss';

type OnSubmitFormProps<T extends FormType> = {
  event: React.FormEvent<HTMLFormElement>,
  values: ReturnType<T['getState']>['values'],
};

export interface FormProps<T extends FormType> {
  children: React.ReactNode,
  className?: string,
  onSubmit?: (props: OnSubmitFormProps<T>) => void,
  form?: T
}

const Form = <T extends FormType>({
  children,
  className,
  onSubmit,
  form,
}: FormProps<T>) => {
  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form?.getState()?.validate?.();
    if (!form?.getState()?.isValid) return;

    const { values } = form?.getState() ?? { values: {} };
    if (onSubmit) onSubmit({ event, values });
  }, [form, onSubmit]);

  const elements = useMemo(() => {
    if (children) {
      return addExtraPropsChildren(children, { form });
    }
    return children;
  }, []);

  useEffect(() => {
    return () => {
      form?.getState()?.clearForm?.();
    };
  }, []);

  return (
    <form
      className={classNames(styles.root, className)}
      onSubmit={onSubmitHandler}
    >
      {elements}
    </form>
  );
};

export type { OnSubmitFormProps };

export default Form;
