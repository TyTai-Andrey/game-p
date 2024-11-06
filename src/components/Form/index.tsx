// vendor imports
import classNames from 'classnames';

// react
import React from 'react';

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
}) => (
  <form className={classNames(styles.root, className)} onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
