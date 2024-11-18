// vendor imports
import classNames from 'classnames';

// react
import React, { useCallback, useEffect, useMemo } from 'react';

// styles
import addExtraPropsChildren from '@utils/addExtraPropsChildren';
import makeFormStore from '@utils/makeFormStore';
import styles from './Form.module.scss';

type FormType = ReturnType<typeof makeFormStore>;

type OnSubmitFormProps = {
  event: React.FormEvent<HTMLFormElement>,
  values: ReturnType<FormType['getState']>['values'],
};

export interface FormProps {
  children: React.ReactNode,
  className?: string,
  onSubmit?: (props: OnSubmitFormProps) => void,
  form?: FormType
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
  form,
}) => {
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
