// vendor imports
import classNames from 'classnames';

// react
import { FC } from 'react';

// local imports
// styles
import styles from '@components/Loader/Loader.module.scss';

type Props = {
  className?: string;
};

const Loader: FC<Props> = ({ className }) => (
  <div className={classNames(styles.wrapper, className)}>
    <div className={styles.dots} />
  </div>
);

export default Loader;
