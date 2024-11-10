// react
import React, {
  FC,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Portal } from 'react-portal';

// local imports
// styles
import classNames from 'classnames';
import styles from './Modal.module.scss';

type ExtendedModalProps = {
  className?: string;
};

export type ModalProps = {
  children: React.ReactNode | ((data: ExtendedModalProps) => React.ReactNode);
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
  classNameRoot?: string;
} & ExtendedModalProps;

const Modal: FC<ModalProps> = forwardRef(
  ({
    children,
    classNameRoot,
    className,
    style,
    isOpen,
    title,
    onClose,
    ...props
  },
  ref: React.Ref<HTMLDivElement>,
  ) => {
    const $content = useRef<HTMLDivElement>(null);
    const $backdrop = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    const element = useMemo(() => {
      if (typeof children === 'function') {
        return children({ ...props });
      }
      if (isValidElement(children)) {
        return cloneElement(children, {
          ...(children.props ?? {}),
          ...props,
        });
      }
      return children;
    }, [children, props]);

    return isOpen ? (
      <Portal>
        <div className={classNames(styles.root, classNameRoot)} ref={ref}>
          <div
            className={styles.backdrop}
            ref={$backdrop}
          />

          <div className={classNames(styles.wrapper, className)} ref={$content} style={style}>
            <div className={styles.header}>
              {title && <div className={styles.title}>{title}</div>}
              <button className={styles.close} onClick={handleClose}>
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <div className={styles.content}>{element}</div>
          </div>
        </div>
      </Portal>
    ) : null;
  },
);

export default Modal;
