import { FormikErrors } from 'formik';
import * as Yup from 'yup';

export type FormType<T> = {
  values: T;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  isValid: boolean;
  dirty: boolean;
  errors: FormikErrors<T>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [x: string]: any;
};