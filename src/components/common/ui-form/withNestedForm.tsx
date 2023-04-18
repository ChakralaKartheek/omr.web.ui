import React, { useCallback, useEffect } from 'react';
import { getIn, useFormik } from 'formik';

export function withNestedForm<T, FormType>(
  sectionName: string,
  Component: React.JSXElementConstructor<FormType>,
): Function {
  const displayName = Component.name || 'FieldSetwithNestedForm';
  const onSubmit = (): void => { };
  
  const FieldSetWithNestedForm = React.memo((props: any): JSX.Element => {
    const form = useFormik({
      initialValues: props.formValues,
      onSubmit,
      validationSchema: props.validationSchema
    });
    const isRequired = (name: string): boolean => {
      const fieldValidationSchema = props.validationSchema ? getIn(props.validationSchema.describe().fields, name) : false;
      const tests = fieldValidationSchema ? fieldValidationSchema.tests : false;
      
      return tests ? !!tests.find((test: any) => test.name === 'required') : false;
    };
    
    const handleBlur = useCallback((e: React.FocusEvent<any>): void => {
      if (e.target.value && e.target.type === 'text' && e.target.value !== e.target.value.trim()) {
        form.setFieldValue(e.target.name, e.target.value.trim());
        props.parentSetFieldValue(`${sectionName}.${e.target.name}`, e.target.value.trim());
      }
      form.handleBlur(e);
      const event = {
        target: {
          name: `${sectionName}.${e.target.name}`,
          value: e.target.type === 'number' ? Number(e.target.value) : e.target.value
        }
      };
      props.parentHandleBlur(event);
    }, []);
    useEffect(() => {
      if (!props.isValid && form.isValid) {
        form.validateForm();
      }
    }, [props.isValid, form.isValid]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
      form.handleChange(e);
      
      let event: any = {};
      switch (e.target.type) {
        case 'number':
          event = {
            target: {
              name: `${sectionName}.${e.target.name}`,
              value: e.target.type === 'number' ? Number(e.target.value) : e.target.value
            }
          };
          break;
        case 'checkbox':
          event = {
            target: {
              name: `${sectionName}.${e.target.name}`,
              value: String(e.target.checked)
            }
          };
          break;
        default:
          event = {
            target: {
              name: `${sectionName}.${e.target.name}`,
              value: e.target.value
            }
          };
          break;
      }
      props.parentHandleChange(event);
    }, []);

    return (
      <Component
        values={form.values}
        handleBlur={handleBlur}
        handleChange={handleChange}
        errors={form.errors}
        isValid={form.isValid}
        dirty={form.dirty}
        isRequired={isRequired}
        {...props}
      />
    );
  });
  FieldSetWithNestedForm.displayName = `withNestedForm(${displayName})`;
  return FieldSetWithNestedForm;
};