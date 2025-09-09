import { Field } from "formik";
import { type ReactNode } from "react";
import classes from "./Register/Register.module.css";

type MyCheckboxType = {
  label: string;
  classForLabel?: string;
  classForSpan?: string;
  name: string;
  type?: string;
  value?: string;
  id?: string;
  classForDiv: string;
  classForMain?: string;
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
  classForMain,
  id,
  classForDiv,
  children,
}: MyCheckboxType) {
  return (
    <div className={classes.FieldContainer + " " + classForMain}>
      <label htmlFor={id ? `${name}-${id}` : name} className={classForLabel}>
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
