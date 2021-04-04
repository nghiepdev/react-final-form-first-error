import React, {useMemo} from 'react';
import {ValidationErrors} from 'final-form';
import {useFormState} from 'react-final-form';

// Reference https://github.com/streamich/react-use/blob/master/src/factory/createMemo.ts
export const createMemo = <T extends (...args: any) => any>(fn: T) => (
  ...args: Parameters<T>
) => useMemo<ReturnType<T>>(() => fn(...args), args);

export const useFirstError = createMemo(
  (
    errors: ValidationErrors = {},
    modified: {[key: string]: boolean} = {},
    submitFailed: boolean
  ) => {
    for (const [key, value] of Object.entries(errors)) {
      if (submitFailed || modified[key] === true) {
        return value;
      }
    }
  }
);

export const FormError = ({
  children,
  render,
}:
  | {
      children: React.ReactNode;
      render?: never;
    }
  | {
      children?: never;
      render: (error: string) => React.ReactNode;
    }) => {
  const {errors, submitError, modified, submitFailed} = useFormState();
  const firstError = useFirstError(errors, modified, submitFailed);

  const error = firstError || submitError || null;

  if (typeof children === 'function') {
    return children(error);
  }

  if (typeof render === 'function') {
    return render(error);
  }

  return error;
};
