import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// constants
import mailValidator from '@constants/validators';

// utils
import isResponse from '@utils/check-types';

// styles
import styles from '@pages/Register/Register.module.scss';

// components
import Form, { OnSubmitFormProps } from '@components/Form';
import Buttons from '@pages/Register/Buttons';
import Input from '@components/Input';

// api
import AuthApi from '@api/AuthApi';
import pathnames from '@constants/pathnames';

// store
import useStore from '@store/index';

// hooks
import useForm from '@hooks/useForm';

const Register = () => {
  const form = useForm('registerForm', {
    email: {
      defaultValidators: ['required'],
      valueType: 'string',
      pattern: { regexp: mailValidator, message: 'Это не email' },
    },
    password: { defaultValidators: ['required'], valueType: 'string', minLength: 6 },
    repeatPassword: { defaultValidators: ['required'], valueType: 'string', minLength: 6, equalTo: 'password' },
  });
  const navigate = useNavigate();

  const setAuthData = useStore(state => state.setAuthData);

  const [error, setError] = useState('');

  const onSubmit = useCallback(({ values }: OnSubmitFormProps<typeof form>) => {
    AuthApi.register({
      email: String(values.email),
      password: String(values.password),
    }).then((data) => {
      if (isResponse(data)) {
        setAuthData(data);
        navigate(pathnames.settings);
      } else {
        setError(data.error.message);
      }
    });
  }, []);

  return (
    <div className={styles.root}>
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
            label="Пароль"
            required
          />
        </Form.Item>
        <Form.Item name="repeatPassword" needValidate={false}>
          <Input
            autoComplete="repeatPassword"
            autoCorrect="off"
            className={styles.input}
            id="repeatPassword"
            label="Повторите пароль"
            required
          />
        </Form.Item>
        {error && <div className={styles.error}>{error}</div>}
        <Buttons />
      </Form>
    </div>
  );
};

export default Register;
