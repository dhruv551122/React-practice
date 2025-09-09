import { ErrorMessage, Form, Formik } from "formik";
import classes from "./Register.module.css";
import MyInput from "../MyInput";
import { useEffect, useState } from "react";
import { validationSchema } from "../utils/RegisterValidationSchema";
import MyCheckBox from "../MyCheckBox";
import { useNavigate } from "react-router-dom";
import MySelect from "../MySelect";
import { fetchCities, fetchStates } from "../utils/fetchItems";
import MyTextArea from "../MyTextArea";
import { initialValues } from "../utils/initialValue";

const users: [] = JSON.parse(localStorage.getItem("users") as string) || [];

const COUNTRY_URL = "https://api.countrystatecity.in/v1/countries/";

const headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "TkxFdFJWV1FSUkE1dU0zZHppUlN2eUJxckJYR21EN3pmazlJTExnRQ=="
);

const requestOptions = {
  method: "GET",
  headers: headers,
};

export type Country = {
  capital: string;
  currency: string;
  emoji: string;
  id: number;
  iso2: string;
  iso3: string;
  name: string;
  native: string;
  phonecode: string;
};

export type State = {
  "id": number;
  "name": string;
  "iso2": string;
};

export type City = {
  "id": number;
  "name": string;
};

function Register() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [, setCities] = useState<City[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(COUNTRY_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className={classes.main}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          const newUsers = [...users, values];
          localStorage.setItem("users", JSON.stringify(newUsers));
          navigate("/login");
        }}
      >
        {({ values, setFieldValue, touched, errors, dirty, isValid }) => {
          console.log("hii");

          return (
            <Form className={classes.form}>
              <h1 className={classes.fullWidth + " " + classes.heading}>
                Create Account
              </h1>
              <MyInput
                name="fullName"
                classForLabel={`${classes.column}   ${
                  touched.fullName && errors.fullName && classes.error
                }`}
                classForMain={classes.fullWidth}
                classForSpan={
                  values.fullName ? classes.onInputBorder : classes.onInput
                }
                label="Full Name"
              />
              <MyInput
                name="email"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column}  ${
                  touched.email && errors.email && classes.error
                }`}
                classForSpan={
                  values.email ? classes.onInputBorder : classes.onInput
                }
                label="Email"
              />
              <MyInput
                name="phoneNo"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column}  ${
                  touched.phoneNo && errors.phoneNo && classes.error
                }`}
                classForSpan={
                  values.phoneNo ? classes.onInputBorder : classes.onInput
                }
                label="Mobile Number"
              />
              <MyInput
                name="password"
                classForLabel={`${classes.column} ${
                  touched.password && errors.password && classes.error
                }`}
                classForSpan={
                  values.password ? classes.onInputBorder : classes.onInput
                }
                label="Password"
              />
              <MyInput
                name="cPassword"
                classForLabel={`${classes.column} ${
                  touched.cPassword && errors.cPassword && classes.error
                }`}
                classForSpan={
                  values.cPassword ? classes.onInputBorder : classes.onInput
                }
                label="Confirm Password"
              />
              <MyInput
                name="expectedSalary"
                classForLabel={`${classes.column} ${
                  touched.expectedSalary &&
                  errors.expectedSalary &&
                  classes.error
                }`}
                classForSpan={classes.onInputBorder}
                label="Expected Salary"
                type="number"
              />

              <MySelect
                classesForLabel={`${classes.column} ${
                  touched.country && errors.country && classes.error
                }`}
                options={countries}
                name="country"
                fetchItems={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  fetchStates(
                    e,
                    setFieldValue,
                    COUNTRY_URL,
                    requestOptions,
                    setStates
                  )
                }
              />

              <MySelect
                classesForLabel={`${classes.column} ${
                  touched.state && errors.state && classes.error
                }`}
                options={states}
                name="state"
                fetchItems={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  fetchCities(
                    e,
                    setFieldValue,
                    COUNTRY_URL,
                    requestOptions,
                    setCities,
                    JSON.parse(values.country).code
                  )
                }
              />

              <MySelect
                classesForLabel={`${classes.column} ${
                  touched.city && errors.city && classes.error
                }`}
                options={states}
                name="city"
                fetchItems={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue("city", e.target.value)
                }
              />

              <div className={classes.FieldContainer + " " + classes.fullWidth}>
                <label
                  htmlFor="gender"
                  className={`${classes.column} ${classes.fullWidth}`}
                >
                  <span>Select Gender</span>
                  <div className={classes.row}>
                    <MyCheckBox
                      id="gender"
                      name="gender"
                      label="Male"
                      type="radio"
                      value="male"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.radio}
                    />
                    <MyCheckBox
                      id="female"
                      name="gender"
                      label="Female"
                      type="radio"
                      value="female"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.radio}
                    />
                    <MyCheckBox
                      id="other"
                      name="gender"
                      label="Other"
                      type="radio"
                      value="other"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.radio}
                    />
                  </div>
                </label>
                <ErrorMessage
                  component="div"
                  name="gender"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </div>

              <div className={classes.FieldContainer + " " + classes.fullWidth}>
                <label htmlFor="skills" className={`${classes.column}`}>
                  <span>Skills</span>
                  <div className={classes.row}>
                    <MyCheckBox
                      id="react"
                      name="skills"
                      type="checkbox"
                      label="React"
                      value="react"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.checkbox}
                    />

                    <MyCheckBox
                      id="node"
                      name="skills"
                      type="checkbox"
                      label="Node.js"
                      value="node.js"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="python"
                      name="skills"
                      type="checkbox"
                      label="Python"
                      value="python"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="java"
                      name="skills"
                      type="checkbox"
                      label="Java"
                      value="java"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="other"
                      name="skills"
                      type="checkbox"
                      label="Other"
                      value="other"
                      classForLabel={classes.row + " " + classes.gap}
                      classForDiv={classes.checkbox}
                    />
                  </div>
                </label>
                <ErrorMessage
                  component="div"
                  name="skills"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </div>

              <MyInput
                name="dob"
                type="date"
                label="Date of Birth"
                classForLabel={`${classes.column} ${
                  touched.dob && errors.dob && classes.error
                }`}
                classForSpan={classes.onInputBorder}
              />
              <MyInput
                name="joiningDate"
                type="date"
                label="Joining Date"
                classForLabel={`${classes.column} ${
                  touched.joiningDate && errors.joiningDate && classes.error
                }`}
                classForSpan={classes.onInputBorder}
              />

              <label className={classes.fullWidth}>
                <div className={classes.parentLabel}>Availability Period</div>
                <div className={classes.row}>
                  <MyInput
                    name="dateRangeStart"
                    type="date"
                    label="From"
                    classForLabel={`${classes.column} ${
                      touched.dateRangeStart &&
                      errors.dateRangeStart &&
                      classes.error
                    }`}
                    classForSpan={classes.onInputBorder}
                  />
                  <div className={classes.arrowIcon}>
                    <i className="bi bi-arrows"></i>
                  </div>
                  <MyInput
                    name="dateRangeEnd"
                    type="date"
                    label="To"
                    classForLabel={`${classes.column} ${
                      touched.dateRangeEnd &&
                      errors.dateRangeEnd &&
                      classes.error
                    }`}
                    classForSpan={classes.onInputBorder}
                  />
                </div>
              </label>

              <MyTextArea
                name="coverLetter"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column} ${
                  touched.coverLetter && errors.coverLetter && classes.error
                }`}
                classForSpan={
                  values.coverLetter ? classes.onInputBorder : classes.onInput
                }
                label="Cover Letter"
              />

              <MyInput
                name="resume"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column} ${
                  touched.resume && errors.resume && classes.error
                }`}
                classForSpan={classes.onInputBorder}
                label="Resume"
                as="textarea"
                onFileChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue(
                    "resume",
                    e.currentTarget.files ? e.currentTarget.files[0] : ""
                  )
                }
                type="file"
              />

              <div className={classes.row}>
                <MyCheckBox
                  name="conditionAcceptance"
                  label="Accept Terms & Conditions"
                  type="checkbox"
                  classForDiv={classes.checkbox}
                  classForMain={classes.fullWidth}
                  classForLabel={classes.row + " " + classes.gap}
                >
                  <ErrorMessage
                    component="div"
                    name="conditionAcceptance"
                    className={classes.errorMsg}
                  ></ErrorMessage>
                </MyCheckBox>
                <div></div>
              </div>

              <button
                className={classes.fullWidth + " " + classes.submitButton}
                type="submit"
                disabled={!(dirty && isValid)}
              >
                submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
