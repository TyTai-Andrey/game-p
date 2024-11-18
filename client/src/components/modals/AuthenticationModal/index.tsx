import React, { FC, useCallback, useState } from 'react';

// styles
import styles from '@components/modals/AuthenticationModal/AuthenticationModal.module.scss';

// components
import Form, { OnSubmitFormProps } from '@components/Form';
import Buttons from '@components/modals/AuthenticationModal/Buttons';
import FormItem from '@components/Form/FormItem';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { ModalComponentProps } from '@components/ModalProvider';

// utils
import isResponse from '@utils/check-types';
import makeFormStore from '@utils/makeFormStore';

// constants
import emailValidator from '@constants/validators';

// api
import AuthApi from '@api/AuthApi';

// store
import useStore from '@store/index';

type AuthenticationModalProps = {
  onClose?: () => void
} & ModalComponentProps;

const useForm = makeFormStore({
  email: {
    defaultValidators: ['required'],
    valueType: 'string',
    pattern: { regexp: emailValidator, message: 'Это не email' },
  },
  password: { defaultValidators: ['required'], valueType: 'string', minLength: 6 },
}, 'authForm');

const AuthenticationModal: FC<AuthenticationModalProps> = ({ isOpen, handleClose, onClose }) => {
  const [error, setError] = useState('');

  const setAuthData = useStore(state => state.setAuthData);

  const onSubmit = useCallback(({ values }: OnSubmitFormProps) => {
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
      <Form className={styles.form} form={useForm} onSubmit={onSubmit}>
        <FormItem name="email" needValidate={false}>
          <Input
            autoComplete="email"
            autoCorrect="off"
            className={styles.input}
            id="email"
            label="Email"
            required
          />
        </FormItem>
        <FormItem name="password">
          <Input
            autoComplete="password"
            autoCorrect="off"
            className={styles.input}
            id="password"
            label="Password"
            required
          />
        </FormItem>
        {error && <div className={styles.error}>{error}</div>}
        <Buttons handleClose={handleClose} />
      </Form>
    </Modal>
  );
};

export default AuthenticationModal;
