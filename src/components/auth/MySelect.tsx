import { ErrorMessage, Field, type FieldProps } from "formik";
import classes from "./Register/Register.module.css";
import type { City, Country, State } from "./Register/Register";

type MySelectType = {
  classesForLabel: string;
  options: Country[] | State[] | City[];
  name: string;
  fetchItems: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function MySelect({
  classesForLabel,
  options,
  name,
  fetchItems,
}: MySelectType) {
  return (
    <div className={classes.FieldContainer}>
      <label htmlFor="country" className={classesForLabel}>
        <span className={classes.onInputBorder}>Country</span>
        <Field
          name="country"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => fetchItems(e)}
          name={name}
          as="select"
        >
          <option value="">Select country</option>
          {options.map((option) => (
            <option
              key={"iso2" in option ? option.iso2 : option.name}
              value={JSON.stringify({
                name: option.name,
                code: option.iso2 ? option.iso2 : "",
              })}
            >
              {option.name}
            </option>
          ))}
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

export default MySelect;
