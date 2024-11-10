// vendor imports
import classNames from 'classnames';

// react
import React from 'react';

// components
import InputBase from '@components/InputBase';

// styles
import styles from '@components/Input/Input.module.scss';

export type InputHTMLType = 'text' | 'number' | 'password' | 'phone' | 'email' | 'tel';

export type InputProps = {
  className?: string;
  id?: string;
  name?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  type?: InputHTMLType;
  error?: boolean | string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLength?: number;
  pattern?: string;
  onFocus?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.FormEvent<HTMLInputElement>) => void;
  variantError?: 'default' | 'minimal';
} & React.InputHTMLAttributes<HTMLInputElement>;

export interface InputStatic
  extends React.ForwardRefExoticComponent<
  React.PropsWithoutRef<InputProps> &
  React.RefAttributes<HTMLInputElement>
  > {
}

const Input: InputStatic = React.forwardRef(
  (
    {
      autoFocus,
      className,
      disabled,
      error,
      id,
      label,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      pattern,
      placeholder,
      prefix,
      suffix,
      type = 'text',
      value,
      variantError,
      ...props
    },
    ref,
  ) => (
    <InputBase
      className={classNames(styles.root, className)}
      disabled={disabled}
      error={error}
      id={id}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={value}
      variantError={variantError}
    >
      {({ handleBlur, handleFocus }) => (
        <input
          {...props}
          autoFocus={autoFocus}
          className={styles.input}
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={value}
        />
      )}
    </InputBase>
  ),
);

export default Input;
