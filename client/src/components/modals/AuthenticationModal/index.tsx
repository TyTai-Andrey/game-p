import React, { FC, useCallback, useState } from 'react';

// styles
import styles from '@components/modals/AuthenticationModal/AuthenticationModal.module.scss';

// components
import Form, { OnSubmitFormProps } from '@components/Form';
import Buttons from '@components/modals/AuthenticationModal/Buttons';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { ModalComponentProps } from '@components/ModalProvider';

// utils
import isResponse from '@utils/check-types';

// constants
import emailValidator from '@constants/validators';

// api
import AuthApi from '@api/AuthApi';

// store
import useStore from '@store/index';

// hooks
import useForm from '@hooks/useForm';

type AuthenticationModalProps = {
  onClose?: () => void
} & ModalComponentProps;

const AuthenticationModal: FC<AuthenticationModalProps> = ({ isOpen, handleClose, onClose }) => {
  const form = useForm('authForm', {
    email: {
      defaultValidators: ['required'],
      valueType: 'string',
      pattern: { regexp: emailValidator, message: 'Это не email' },
    },
    password: { defaultValidators: ['required'], valueType: 'string', minLength: 6 },
  });
  const [error, setError] = useState('');

  const setAuthData = useStore(state => state.setAuthData);

  const onSubmit = useCallback(({ values }: OnSubmitFormProps<typeof form>) => {
    AuthApi.login(values as AuthData).then((data) => {
      if (isResponse(data)) {
        setAuthData(data);
        handleClose();
      } else {
        setError(data.error.message);
      }
    });
  }, []);

  const onCloseHandler = useCallback(() => {
    onClose?.();
    handleClose();
  }, []);

  return (
    <Modal className={styles.root} isOpen={isOpen} onClose={onCloseHandler} title="Войти">
      <Form className={styles.form} form={form} onSubmit={onSubmit}>
        <Form.Item name="email" needValidate={false}>
          <Input
            autoComplete="email"
            autoCorrect="off"
            className={styles.input}
            id="email"
            label="Email"
            required
          />
        </Form.Item>
        <Form.Item name="password" needValidate={false}>
          <Input
            autoComplete="password"
            autoCorrect="off"
            className={styles.input}
            id="password"
            label="Password"
            required
          />
        </Form.Item>
        {error && <div className={styles.error}>{error}</div>}
        <Buttons handleClose={handleClose} />
      </Form>
    </Modal>
  );
};

export default AuthenticationModal;
