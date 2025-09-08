import { ErrorMessage, Field, Form, Formik } from "formik";
import classes from "./Register.module.css";
import MyInput from "../MyInput";
import { useEffect, useState } from "react";
import { validationSchema } from "./RegisterValidationSchema";
import MyCheckBox from "../MyCheckBox";

const users: [] = JSON.parse(localStorage.getItem("users") as string) || [];

const COUNTRY_URL = "https://api.countrystatecity.in/v1/countries";
const STATE_URL = "https://api.countrystatecity.in/v1/countries/IN/states";
const CITY_URL =
  "https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode?";
const headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "TkxFdFJWV1FSUkE1dU0zZHppUlN2eUJxckJYR21EN3pmazlJTExnRQ=="
);

const requestOptions = {
  method: "GET",
  headers: headers,
};

type Country = {
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

type State = {
  "id": number;
  "name": string;
  "iso2": string;
};

type City = {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
};

function Register() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [focusedField, setFocusedField] = useState<string>("");

  useEffect(() => {
    fetch(COUNTRY_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className={classes.main}>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          phoneNo: null,
          password: "",
          cPassword: "",
          expectedSalary: 0,
          gender: "",
          conditionAcceptance: false,
          skills: [],
          country: "",
          state: "",
          city: "",
          dob: "",
          joiningDate: "",
          dateRangeStart: "",
          dateRangeEnd: "",
          coverLetter: "",
          resume: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          localStorage.setItem("users", JSON.stringify(values));
        }}
      >
        {({ values, setFieldValue, touched, errors, handleBlur }) => {
          function createClasses(name: keyof typeof values) {
            return values[name]
              ? classes.onInputBorder
              : focusedField === name && classes.onInputBorder;
          }
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
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                focusedField={focusedField}
                classForSpan={`${classes.onInput} ${createClasses("fullName")}`}
                label="Full Name"
              >
                <ErrorMessage
                  component="div"
                  name="fullName"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="email"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column}  ${
                  touched.email && errors.email && classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={`${classes.onInput} ${createClasses("email")}`}
                label="Email"
              >
                <ErrorMessage
                  component="div"
                  className={classes.errorMsg}
                  name="email"
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="phoneNo"
                classForMain={classes.fullWidth}
                focusedField={focusedField}
                classForLabel={`${classes.column}  ${
                  touched.phoneNo && errors.phoneNo && classes.error
                }`}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={`${classes.onInput} ${createClasses("phoneNo")}`}
                label="Mobile Number"
              >
                <ErrorMessage
                  component="div"
                  name="phoneNo"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="password"
                classForLabel={`${classes.column} ${
                  touched.password && errors.password && classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={`${classes.onInput} ${createClasses("password")}`}
                label="Password"
              >
                <ErrorMessage
                  component="div"
                  name="password"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="cPassword"
                classForLabel={`${classes.column} ${
                  touched.cPassword && errors.cPassword && classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={`${classes.onInput} ${createClasses(
                  "cPassword"
                )}`}
                label="Confirm Password"
              >
                <ErrorMessage
                  component="div"
                  name="cPassword"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="expectedSalary"
                classForLabel={`${classes.column} ${
                  touched.expectedSalary &&
                  errors.expectedSalary &&
                  classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={classes.onInputBorder}
                label="Expected Salary"
                type="number"
              >
                <ErrorMessage
                  component="div"
                  name="expectedSalary"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>

              <div className={classes.FieldContainer}>
                <label
                  htmlFor="country"
                  className={`${classes.column} ${
                    touched.country && errors.country && classes.error
                  }`}
                >
                  <span className={classes.onInputBorder}>Country</span>
                  <Field
                    name="country"
                    as="select"
                    value={values.country}
                    onChange={async (
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                      const data = JSON.parse(e.target.value);
                      setFieldValue("country", JSON.stringify(data));
                      setFieldValue("state", "");
                      setFieldValue("city", "");
                      setCities([]);

                      fetch(STATE_URL + data.code, requestOptions)
                        .then((res) => res.json())
                        .then((data) => setStates(data));
                    }}
                  >
                    <option>Select country</option>
                    {countries.map((country) => (
                      <option
                        key={country.iso2}
                        value={JSON.stringify({
                          name: country.name,
                          code: country.iso2,
                        })}
                      >
                        {country.name}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage
                  component="div"
                  name="country"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </div>

              <div className={classes.FieldContainer}>
                <label htmlFor="state" className={classes.column}>
                  <span className={classes.onInputBorder}>State</span>
                  <Field
                    name="state"
                    as="select"
                    value={values.state}
                    onChange={async (
                      e: React.ChangeEvent<HTMLSelectElement>
                    ) => {
                      const data = JSON.parse(e.target.value);
                      setFieldValue("state", JSON.stringify(data));
                      setFieldValue("city", "");
                      fetch(
                        CITY_URL +
                          `countrycode=${data.countryCode}&statecode=${data.stateCode}`,
                        options
                      )
                        .then((res) => res.json())
                        .then((data) => setCities(data));
                    }}
                  >
                    <option>Select state</option>
                    {states.map((state) => (
                      <option
                        key={state.isoCode}
                        value={JSON.stringify({
                          name: state.name,
                          countryCode: state.countryCode,
                          stateCode: state.isoCode,
                        })}
                      >
                        {state.name}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage
                  component="div"
                  name="state"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </div>

              <div className={classes.FieldContainer}>
                <label htmlFor="city" className={classes.column}>
                  <span className={classes.onInputBorder}>City</span>
                  <Field name="city" as="select">
                    <option>Select city</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage
                  component="div"
                  name="city"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </div>

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
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.radio}
                    />
                    <MyCheckBox
                      id="female"
                      name="gender"
                      label="Female"
                      type="radio"
                      value="female"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.radio}
                    />
                    <MyCheckBox
                      id="other"
                      name="gender"
                      label="Other"
                      type="radio"
                      value="other"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
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
                  <div className={classes.row + " " + classes.gap}>
                    <MyCheckBox
                      id="react"
                      name="skills"
                      type="checkbox"
                      label="React"
                      value="react"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.checkbox}
                    />

                    <MyCheckBox
                      id="node"
                      name="skills"
                      type="checkbox"
                      label="Node.js"
                      value="node.js"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="python"
                      name="skills"
                      type="checkbox"
                      label="Python"
                      value="python"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="java"
                      name="skills"
                      type="checkbox"
                      label="Java"
                      value="java"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
                      classForDiv={classes.checkbox}
                    />
                    <MyCheckBox
                      id="other"
                      name="skills"
                      type="checkbox"
                      label="Other"
                      value="other"
                      focusedField={focusedField}
                      setFocusedField={setFocusedField}
                      handleBlur={handleBlur}
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
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={classes.onInputBorder}
              >
                <ErrorMessage
                  component="div"
                  name="dob"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
              <MyInput
                name="joiningDate"
                type="date"
                label="Joining Date"
                focusedField={focusedField}
                classForLabel={`${classes.column} ${
                  touched.joiningDate && errors.joiningDate && classes.error
                }`}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={classes.onInputBorder}
              >
                <ErrorMessage
                  component="div"
                  name="joiningDate"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>
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
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    handleBlur={handleBlur}
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
                    focusedField={focusedField}
                    setFocusedField={setFocusedField}
                    handleBlur={handleBlur}
                    classForSpan={classes.onInputBorder}
                  />
                </div>
                <ErrorMessage
                  component="div"
                  name="dateRangeStart"
                  className={classes.errorMsg}
                ></ErrorMessage>
                {!errors.dateRangeStart && (
                  <ErrorMessage
                    component="div"
                    name="dateRangeEnd"
                    className={classes.errorMsg}
                  ></ErrorMessage>
                )}
              </label>

              <MyInput
                name="coverLetter"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column} ${
                  touched.coverLetter && errors.coverLetter && classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={`${classes.onInput} ${createClasses(
                  "coverLetter"
                )}`}
                label="Cover Letter"
                as="textarea"
              >
                <ErrorMessage
                  component="div"
                  name="coverLetter"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>

              <MyInput
                name="resume"
                classForMain={classes.fullWidth}
                classForLabel={`${classes.column} ${
                  touched.resume && errors.resume && classes.error
                }`}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                classForSpan={classes.onInputBorder}
                type="file"
                label="Upload Resume"
              >
                <ErrorMessage
                  component="div"
                  name="resume"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyInput>

              <MyCheckBox
                name="conditionAcceptance"
                label="Accept Terms & Conditions"
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                handleBlur={handleBlur}
                type="checkbox"
                classForDiv={classes.checkbox}
              >
                <ErrorMessage
                  component="div"
                  name="conditionAcceptance"
                  className={classes.errorMsg}
                ></ErrorMessage>
              </MyCheckBox>

              <button type="submit">submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
