// vendor imports
import classNames from 'classnames';

// react
import React, { useCallback } from 'react';

// styles
import styles from './Form.module.scss';

export interface FormProps {
  children: React.ReactNode,
  className?: string,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
}) => {
  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
  }, [onSubmit]);

  return (
    <form className={classNames(styles.root, className)} onSubmit={onSubmitHandler}>
      {children}
    </form>
  );
};

export default Form;
