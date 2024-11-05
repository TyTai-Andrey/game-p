// vendor imports
import classNames from 'classnames';

// react
import React, { FC } from 'react';

// styles
import styles from '@components/Symbol/Symbol.module.scss';

export type Props = {
  symbol: 'X' | 'O' | '_'
};

const Symbol: FC<Props> = ({ symbol }) => {
  if (symbol === '_') return null;
  return (
    <span className={classNames(styles.root, styles[symbol])}>
      {symbol}
    </span>
  );
};

export default Symbol;
