import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

// Inspired by https://github.com/streamich/react-use/blob/master/src/createMemo.ts
export const createMemo = (fn) => (...args) => useMemo(() => fn(...args), args);

export const useFirstError = createMemo((errors, modified, submitFailed) => {
  for (const [key, value] of Object.entries(errors)) {
    if (submitFailed || modified[key] === true) {
      return value;
    }
  }
});

export const FormError = ({
  errors,
  modified,
  submitError,
  submitFailed,
  children,
}) => {
  const firstError = useFirstError(errors, modified, submitFailed);

  const error = useMemo(() => {
    return firstError || submitError;
  }, [firstError, submitError]);

  if (typeof children === 'function') {
    return children(error);
  }

  return error || null;
};

FormError.propTypes = {
  errors: PropTypes.object.isRequired,
  modified: PropTypes.object.isRequired,
  submitError: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  children: PropTypes.func,
};
