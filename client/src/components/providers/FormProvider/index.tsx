// react
import React, { ReactNode, useMemo } from 'react';

// utils
import { FormType } from '@utils/makeFormStore';

type IFormContextProps = {
  form: FormType;
};

const FormContext = React.createContext<IFormContextProps>({
  form: undefined as unknown as FormType,
});

const FormProvider = ({ children, form }: { children: ReactNode, form: FormType }) => {
  const value = useMemo(() => ({
    form,
  }), [form]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext };
export default FormProvider;
