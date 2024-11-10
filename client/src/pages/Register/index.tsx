import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// constants
import mailValidator from '@constants/validators';

// utils
import isResponse from '@utils/check-types';
import makeFormStore from '@utils/makeFormStore';

// styles
import styles from '@pages/Register/Register.module.scss';

// components
import Button from '@components/Button';
import Form from '@components/Form';
import Input from '@components/Input';

// api
import AuthApi from '@api/AuthApi';
import pathnames from '@constants/pathnames';

// store
import useStore from '@store/index';

const useForm = makeFormStore({
  email: {
    defaultValidators: ['required'],
    valueType: 'string',
    pattern: { regexp: mailValidator, message: 'Это не email' },
  },
  password: { defaultValidators: ['required'], valueType: 'string', minLength: 6 },
  repeatPassword: { defaultValidators: ['required'], valueType: 'string', minLength: 6, equalTo: 'password' },
});

const Register = () => {
  const navigate = useNavigate();

  const setAuthData = useStore(state => state.setAuthData);

  const [error, setError] = useState('');

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
  };

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  return (
    <div className={styles.root}>
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
        <Input
          autoComplete="repeatPassword"
          autoCorrect="off"
          className={styles.input}
          error={errors.repeatPassword}
          id="repeatPassword"
          label="Repeat password"
          name="repeatPassword"
          onChange={onChange}
          required
          value={String(values.repeatPassword)}
        />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttons}>
          <Button type="submit">Зарегистрироваться</Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
