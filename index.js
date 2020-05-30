import {useMemo} from 'react';
import {useFormState} from 'react-final-form';

// Inspired by https://github.com/streamich/react-use/blob/master/src/createMemo.ts
export const createMemo = (fn) => (...args) => useMemo(() => fn(...args), args);

export const useFirstError = createMemo((errors, modified, submitFailed) => {
  for (const [key, value] of Object.entries(errors)) {
    if (submitFailed || modified[key] === true) {
      return value;
    }
  }
});

export const FormError = ({children, render}) => {
  const {errors, submitError, modified, submitFailed} = useFormState();
  const firstError = useFirstError(errors, modified, submitFailed);

  const error = useMemo(() => {
    return firstError || submitError || null;
  }, [firstError, submitError]);

  if (typeof children === 'function') {
    return children(error);
  }

  if (typeof render === 'function') {
    return render(error);
  }

  return error;
};
