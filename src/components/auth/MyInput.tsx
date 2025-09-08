import { ErrorMessage, Field } from "formik";
import { useRef, type ReactNode } from "react";
import classes from "./Register/Register.module.css";

type MyInputType = {
  label: string;
  classForLabel?: string;
  classForSpan?: string;
  name: string;
  setFocusedField: (name: string) => void;
  handleBlur: (e: FocusEvent) => void;
  classForMain?: string;
  focusedField: string;
  id?: string;
  type?: string;
  // onFocus: (name: string) => void;
  // onBlur: (e: FocusEvent) => void;
  children?: ReactNode;
  as?: string;
};

function MyInput({
  label,
  classForLabel,
  classForSpan,
  name,
  // onFocus,
  // onBlur,
  type,
  id,
  focusedField,
  setFocusedField,
  handleBlur,
  children,
  classForMain,
  as,
}: MyInputType) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classForMain + " " + classes.FieldContainer}>
      <label
        htmlFor={id ? `${name}-${id}` : name}
        className={`${classForLabel} ${
          focusedField === name ? classes.focusedField : ""
        }`}
      >
        <span
          ref={spanRef}
          className={`${classForSpan}`}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </span>
        <Field
          ref={inputRef}
          id={id ? `${name}-${id}` : name}
          onFocus={() => setFocusedField(name)}
          onBlur={(e: FocusEvent) => {
            handleBlur(e);
            setFocusedField("");
          }}
          name={name}
          type={type ? type : ""}
          as={as ? as : ""}
        />
      </label>
      {children}
    </div>
  );
}

export default MyInput;
