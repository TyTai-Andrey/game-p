// react
import { useMemo } from 'react';

// utils
import makeFormStore, { FormType, SettingsForm } from '@utils/makeFormStore';

const forms = new Map<string, FormType>();

const useForm = (formName: string, formSettings?: SettingsForm) => {
  const form = useMemo(() => {
    if (forms.has(formName)) return forms.get(formName);
    if (!formSettings) throw new Error('formSettings is required');
    const form = makeFormStore(formSettings, formName);
    forms.set(formName, form);
    return form;
  }, []);

  return form as FormType;
};

export default useForm;
