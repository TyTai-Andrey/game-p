// vendor imports
import classNames from 'classnames';

// react
import React, { FC, memo } from 'react';

// styles
import styles from './Row.module.scss';

type RowProps = {
  children: React.ReactNode
  className?: string
  hide?: boolean
  vertical?: boolean
};

const Row: FC<RowProps> = memo(({
  children,
  className,
  hide,
  vertical,
}) => {
  return hide ? null : (
    <div className={classNames(styles.root, className, {
      [styles.vertical]: vertical,
    })}
    >
      {children}
    </div>
  );
});

export default Row;
