import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useFormik, getIn } from "formik";
import * as Yup from "yup";

export function withForm<T, FormType>(
  Component: React.JSXElementConstructor<FormType>,
  validationSchema?: Yup.AnyObjectSchema
): Function {
  const displayName = Component.name || "FieldSetWithForm";
  const onSubmit = (): void => {};
  const FieldSetWithForm = forwardRef((props: any, ref: any): JSX.Element => {
    const {
      formValues,
      getValidationSchema,
      enableReinitialize,
      validateOnMount,
    } = props;

    const formRef = useRef<any>(null);
    const getSchema = (): Yup.AnyObjectSchema => {
      let schema: any;
      if (typeof getValidationSchema === "function") {
        schema = getValidationSchema(formValues);
      }
      return schema;
    };

    const [schema, setValidationSchema] = useState<any>(
      validationSchema ?? getSchema
    );
    const form = useFormik({
      initialValues: formValues,
      onSubmit,
      validationSchema: schema,
      enableReinitialize: !!enableReinitialize,
      validateOnMount: !!validateOnMount,
    });

    const isRequired = (name: string): boolean => {
      const fieldValidationSchema = schema
        ? getIn(schema.describe().fields, name)
        : false;
      const tests = fieldValidationSchema ? fieldValidationSchema.tests : false;

      return tests
        ? !!tests.find((test: any) => test.name === "required")
        : false;
    };

    const handleSave = (): Promise<any> => {
      return formRef.current?.handleSave();
    };

    const isFormValid = (): boolean => {
      return formRef.current?.isFormValid();
    };

    useImperativeHandle(ref, () => ({ handleSave, isFormValid }));

    useEffect(() => {
      if (typeof getValidationSchema === "function") {
        setValidationSchema(getValidationSchema(form.values));
      }
    }, [form.values]);

    const handleBlur = useCallback((e: React.FocusEvent<any>) => {
      if (
        e.target.value &&
        e.target.type === "text" &&
        e.target.value !== e.target.value.trim()
      ) {
        form.setFieldValue(e.target.name, e.target.value.trim());
      }
      form.handleBlur(e);
    }, []);
    const handleChange = useCallback(form.handleChange, []);
    const handleResetForm = useCallback(form.resetForm, []);
    const setFieldValue = useCallback(form.setFieldValue, []);
    const setValues = useCallback(form.setValues, []);
    return (
      <div>
        <Component
          ref={formRef}
          values={form.values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          setValues={setValues}
          errors={form.errors}
          isValid={form.isValid}
          dirty={form.dirty}
          isRequired={isRequired}
          resetForm={handleResetForm}
          {...props}
        />
      </div>
    );
  });
  FieldSetWithForm.displayName = `withForm(${displayName})`;
  return FieldSetWithForm;
}
