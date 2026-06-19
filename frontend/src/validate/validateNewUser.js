import * as yup from 'yup'

const schema = (t) => yup.object().shape({
    username: yup.string()
      .required(t('error.validation.required'))
      .min(3, t('error.validation.username'))
      .max(20, t('error.validation.username')),
    password: yup.string()
      .required(t('error.validation.required'))
      .min(6, t('error.validation.password')),
    confirmPassword: yup.string()
      .required(t('error.validation.required'))
      .oneOf([yup.ref('password'), null], t('error.validation.passwordMismatch')),
  });

  export default schema
  