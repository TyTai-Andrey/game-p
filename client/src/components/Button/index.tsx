// vendor imports
import classNames from 'classnames';

// react
import React, { FC } from 'react';

// styles
import styles from '@components/Button/Button.module.scss';

type Props = {
  children?: React.ReactNode
  variant?: 'filled' | 'text';
  className?: string
  shape?: 'round' | 'circle';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  children,
  className,
  disabled,
  shape = 'round',
  variant = 'filled',
  ...props
}) => (
  <button
    className={classNames(
      styles.root,
      styles[variant],
      styles[shape],
      { [styles.disabled]: disabled },
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export type { Props };
export default Button;
