import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import styles from '@components/modals/AuthenticationModal/AuthenticationModal.module.scss';

// components
import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { ModalComponentProps } from '@components/ModalProvider';

// utils
import isResponse from '@utils/check-types';
import makeFormStore from '@utils/makeFormStore';

// constants
import emailValidator from '@constants/validators';
import pathnames from '@constants/pathnames';

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
});

const AuthenticationModal: FC<AuthenticationModalProps> = ({ isOpen, handleClose, onClose }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setAuthData = useStore(state => state.setAuthData);

  const values = useForm(state => state.values);
  const errors = useForm(state => state.errors);
  const setValues = useForm(state => state.setValues);
  const validate = useForm(state => state.validate);
  const clearForm = useForm(state => state.clearForm);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({
      [e.target.name]: e.target.value,
    }, false);
  };

  const onSubmit = () => {
    validate();
    const { isValid } = useForm.getState();
    if (!isValid) return;
    AuthApi.login(values as AuthData).then((data) => {
      if (isResponse(data)) {
        setAuthData(data);
        handleClose();
      } else {
        setError(data.error.message);
      }
    });
  };

  const onRegister = () => {
    handleClose();
    navigate(pathnames.register);
  };

  const onCloseHandler = useCallback(() => {
    onClose?.();
    handleClose();
  }, []);

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  return (
    <Modal className={styles.root} isOpen={isOpen} onClose={onCloseHandler} title="Войти">
      <Form className={styles.form} onSubmit={onSubmit}>
        <Input
          autoComplete="email"
          autoCorrect="off"
          className={styles.input}
          error={errors.email}
          id="email"
          label="Email"
          name="email"
          onChange={onChange}
          required
          value={String(values.email)}
        />
        <Input
          autoComplete="password"
          autoCorrect="off"
          className={styles.input}
          error={errors.password}
          id="password"
          label="Password"
          name="password"
          onChange={onChange}
          required
          value={String(values.password)}
        />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttons}>
          <Button onClick={onRegister} variant="text">Нет аккаунта ?</Button>
          <Button type="submit">Войти</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AuthenticationModal;
