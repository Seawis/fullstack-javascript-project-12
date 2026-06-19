import * as yup from 'yup'

const schema = (channelNames, t) => yup.object().shape({
    newName: yup.string()
      .min(3, t('error.validation.username'))
      .max(20, t('error.validation.username'))
      .required(t('error.validation.required'))
      .notOneOf(channelNames, t('error.validation.notOneOf'))
      .trim(t('error.validation.required')),
    });

  export default schema