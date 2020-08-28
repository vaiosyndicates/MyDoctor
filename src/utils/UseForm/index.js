import {useState} from 'react';

export const useForm = initiaValue => {
  const [values, setValues] = useState(initiaValue);
  return [
    values,
    (formType, params) => {
      if (formType === 'reset') {
        return setValues(initiaValue);
      }
      return setValues({...values, [formType]: params});
    },
  ];
};
