import { ErrorMessage, Field, type FieldProps } from "formik";
import { useState } from "react";
import classes from "./Register/Register.module.css";

type MyTextArea = {
  label: string;
  classForLabel?: string;
  classForSpan?: string;
  name: string;
  classForMain?: string;
  id?: string;
};

function MyTextArea({
  label,
  classForLabel,
  classForSpan,
  name,
  id,
  classForMain,
}: MyTextArea) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div className={classForMain + " " + classes.FieldContainer}>
      <label
        htmlFor={id ? `${name}-${id}` : name}
        className={`${classForLabel} ${isFocused ? classes.focusedField : ""}`}
      >
        <span
          className={`${classForSpan} ${
            isFocused ? classes.onInputBorder : ""
          }`}
        >
          {label}
        </span>
        <Field name={name}>
          {({ field, form }: FieldProps) => {
            return (
              <textarea
                {...field}
                id={id ? `${name}-${id}` : name}
                onFocus={() => setIsFocused(true)}
                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                  form.handleBlur(e);
                  setIsFocused(false);
                }}
              />
            );
          }}
        </Field>
      </label>
      <ErrorMessage
        component="div"
        name={name}
        className={classes.errorMsg}
      ></ErrorMessage>
    </div>
  );
}

export default MyTextArea;
