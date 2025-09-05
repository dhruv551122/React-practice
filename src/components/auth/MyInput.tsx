import { Field } from "formik";

function MyInput({
  label,
  cssClass,
  name,
  type,
  value,
  as,
}: {
  label: string;
  cssClass?: string;
  name: string;
  type?: string;
  value?: string;
  as?: string;
}) {
  return (
    <label htmlFor={name} className={cssClass}>
      <span>{label}</span>
      <Field
        name={name}
        type={type ? type : "text"}
        value={value}
        as={as ? as : "input"}
      />
    </label>
  );
}

export default MyInput;
