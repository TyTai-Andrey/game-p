// vendor imports
import classNames from 'classnames';

// react
import React from 'react';

// styles
import styles from '@components/InputBase/InputBase.module.scss';

// utils
import { isNumber } from '@utils/type-operations';

export interface ChildrenProps {
  handleFocus: (
    event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
}

export interface InputBaseProps {
  children: (props: ChildrenProps) => React.ReactElement;
  className?: string;
  id?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  error?: boolean | string | null;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onFocus?: (
    event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => void;
  onClick?: () => void;
  variantError?: 'default' | 'minimal';
  title?: string;
}

const InputBase: React.ForwardRefExoticComponent<
InputBaseProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(
  (
    {
      children,
      className,
      disabled,
      error,
      id,
      label,
      onBlur,
      onClick,
      onFocus,
      placeholder,
      prefix,
      suffix,
      title = '',
      value,
      variantError = 'default',
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);

    const handleFocus = (
      event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
    ) => {
      setFocused(true);
      if (onFocus) onFocus(event);
    };

    const handleBlur = (
      event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>,
    ) => {
      setFocused(false);
      if (onBlur) onBlur(event);
    };

    return (
      <div
        className={classNames(
          styles.root,
          {
            [styles.focused]: focused,
            [styles.failed]: !!error,
            [styles.disabled]: disabled,
            [styles.errorBackgroundColorRed]:
                            variantError === 'minimal',
          },
          className,
        )}
        onClick={onClick}
        ref={ref}
      >
        <label className={styles.control} htmlFor={id}>
          {prefix && <div className={styles.prefix}>{prefix}</div>}

          <div
            className={classNames(styles.wrapper, { [styles.isLabel]: !!label })}
          >
            {label && (
              <span
                className={classNames(styles.label, {
                  [styles.focused]:
                                        isNumber(value) ||
                                        !!value ||
                                        !!placeholder ||
                                        focused,
                })}
                title={title}
              >
                {label}
              </span>
            )}

            {children({ handleBlur, handleFocus })}
          </div>

          {suffix && <div className={styles.suffix}>{suffix}</div>}
        </label>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

// Exports
export default InputBase;
