// vendor imports
import classNames from 'classnames';

// react
import React from 'react';

// styles
import styles from '@components/Checkbox/Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  id?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  value?: string | number;
  name?: string;
  label: string;
  title?: string;
  error?: boolean | string | null;
}

interface CheckboxInterface extends React.FC<CheckboxProps> { }

const Checkbox: CheckboxInterface = ({
  className,
  defaultChecked = false,
  disabled,
  error,
  id,
  label,
  name,
  onChange,
  title = '',
  value,
}) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      setChecked(event.target.checked);

      if (onChange) {
        onChange(event.target.checked);
      }
    },
    [onChange, disabled],
  );

  React.useEffect(() => setChecked(defaultChecked), [defaultChecked]);

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.disabled]: disabled,
          [styles.disabledChecked]: disabled && checked,
          [styles.checked]: !disabled && checked,
        },
        className,
      )}
    >
      <label className={styles.wrapper} htmlFor={id} title={title}>
        <span className={styles.control}>
          <input
            checked={checked}
            disabled={disabled}
            id={id}
            name={name}
            onChange={handleChange}
            type="checkbox"
            value={value}
          />

          <span className={styles.checkbox}>
            {checked && <i className="fa-solid fa-check" />}
          </span>
        </span>

        <span>{label}</span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export type {
  CheckboxInterface,
  CheckboxProps,
};
export default Checkbox;
