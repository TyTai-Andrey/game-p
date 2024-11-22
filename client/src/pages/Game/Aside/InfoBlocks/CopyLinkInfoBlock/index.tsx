// vendor imports
import classNames from 'classnames';

// react
import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// styles
import styles from '@pages/Game/Aside/Info/Info.module.scss';

// components
import Button from '@components/Button';
import copyTextToClipboard from '@utils/copyTextToClipboard';

const CopyLinkInfoBlock = memo(() => {
  const location = useLocation();

  const onClick = useCallback(() => {
    copyTextToClipboard(`${process.env.REACT_APP_CLIENT_BASE_URL}${location.pathname}`);
  }, []);

  return (
    <Button
      className={classNames(styles.infoBlock, styles.copyLink)}
      onClick={onClick}
    >
      Скопировать ссылку
    </Button>
  );
});

export default CopyLinkInfoBlock;
