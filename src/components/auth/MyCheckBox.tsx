import { ErrorMessage, Field } from "formik";
import { useRef, type ReactNode } from "react";
import classes from "./Register/Register.module.css";

type MyCheckboxType = {
  label: string;
  classForLabel?: string;
  classForSpan?: string;
  name: string;
  type?: string;
  value?: string;
  setFocusedField: (name: string) => void;
  handleBlur: (e: FocusEvent) => void;
  focusedField: string;
  id?: string;
  classForDiv: string;
  // onFocus: (name: string) => void;
  // onBlur: (e: FocusEvent) => void;
  children?: ReactNode;
};

function MyCheckBox({
  label,
  classForLabel,
  classForSpan,
  name,
  type,
  value,
  // onFocus,
  // onBlur,
  id,
  classForDiv,
  children,
}: MyCheckboxType) {
  return (
    <div className={classes.FieldContainer}>
      <label
        htmlFor={id ? `${name}-${id}` : name}
        className={`${classForLabel} ` + classes.row}
      >
        <span className={`${classForSpan}`}>{label}</span>
        <div className={classForDiv}>
          <i className="bi bi-check2"></i>
          <Field
            id={id ? `${name}-${id}` : name}
            name={name}
            type={type}
            value={value}
          />
        </div>
      </label>
      {children}
    </div>
  );
}

export default MyCheckBox;
