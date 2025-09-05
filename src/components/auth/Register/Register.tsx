import { ErrorMessage, Field, Form, Formik } from "formik";
import classes from "./Register.module.css";
import MyInput from "../MyInput";
import { useEffect, useState } from "react";
import * as yup from "yup";

const users: [] = JSON.parse(localStorage.getItem("users") as string) || [];

const COUNTRY_URL =
  "https://country-state-city-search-rest-api.p.rapidapi.com/allcountries";
const STATE_URL =
  "https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode=";
const CITY_URL =
  "https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode?";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "536015386cmsh49dd671307d25fdp11bfdfjsn235138c4afc0",
    "x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
  },
};

type Country = {
  currency: string;
  flag: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
  phonecode: string;
  timezones: [
    {
      abbreviation: string;
      gmtOffset: number;
      gmtOffsetName: string;
      tzName: string;
      zoneName: string;
    }
  ];
};

type State = {
  countryCode: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
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

  useEffect(() => {
    fetch(COUNTRY_URL, options)
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
        validationSchema={yup.object({
          fullName: yup
            .string()
            .min(3, "Atleast 3 character long")
            .required("Required"),
          email: yup.string().email("Enter valid email").required("Required"),
          passwrod: yup
            .string()
            .min(6, "Atleast 6 characters long")
            .test(
              "Must include one uppercase latter and one number",
              (value) => {
                const hasUpperCase = /[A-B]/.test(value!);
                const hasNumber = /[0-9]/.test(value!);
                if (hasNumber && hasUpperCase) {
                  return true;
                } else {
                  return false;
                }
              }
            )
            .required("Required"),
          cPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Password must match")
            .required("Required"),
          phoneNo: yup
            .string()
            .test("Must be digit", (value) => {
              const isDigit = /^\d+$/.test(value!);
              if (isDigit) {
                return true;
              } else {
                return false;
              }
            })
            .min(10, "Must be 10 digit long")
            .max(10, "Must be 10 digit long")
            .required("Required"),
          expectedSalary: yup
            .number()
            .min(5000, "Minimum value is 5000")
            .required("Required"),
          gender: yup
            .string()
            .oneOf(["male", "female", "other"], "Select valid gender")
            .required("Required"),
          skills: yup.array(
            yup
              .string()
              .required("Atleast select one skill")
              .min(1, "Atleast select one skill")
          ),
          country: yup.string().required("Required"),
          state: yup.string().required("Required"),
          city: yup.string().required("Required"),
          joiningDate: yup
            .date()
            .min(new Date(), "Must be a future date")
            .required("Required"),
        })}
        onSubmit={(values) => {
          console.log(values);
          localStorage.setItem("users", JSON.stringify(values));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={classes.form}>
            <MyInput
              name="fullName"
              cssClass={`${classes.column} ${classes.fullWidth}`}
              label="Full Name"
            />
            <ErrorMessage name="fullName"></ErrorMessage>
            <MyInput
              name="email"
              cssClass={classes.column + " " + classes.fullWidth}
              label="Email"
            />
            <MyInput
              name="phoneNo"
              cssClass={`${classes.column} ${classes.fullWidth}`}
              label="Mobile Number"
            />
            <MyInput
              name="password"
              cssClass={classes.column}
              label="Password"
            />
            <MyInput
              name="cPassword"
              cssClass={classes.column}
              label="Confirm Password"
            />
            <MyInput
              name="expectedSalary"
              cssClass={classes.column}
              label="Expected Salary"
              type="number"
            />

            <label htmlFor="country" className={classes.column}>
              <span>Country</span>
              <Field
                name="country"
                as="select"
                onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                  const data = JSON.parse(e.target.value);
                  setFieldValue("country", data.name);
                  setFieldValue("state", "");
                  setFieldValue("city", "");
                  setCities([]);
                  fetch(STATE_URL + data.code, options)
                    .then((res) => res.json())
                    .then((data) => setStates(data));
                }}
              >
                <option>Select country</option>
                {countries.map((country) => (
                  <option
                    key={country.isoCode}
                    value={JSON.stringify({
                      name: country.name,
                      code: country.isoCode,
                    })}
                  >
                    {country.name}
                  </option>
                ))}
              </Field>
            </label>

            <label htmlFor="state" className={classes.column}>
              <span>State</span>
              <Field
                name="state"
                as="select"
                onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                  const data = JSON.parse(e.target.value);
                  setFieldValue("state", data.name);
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

            <label htmlFor="city" className={classes.column}>
              <span>City</span>
              <Field name="city" as="select">
                <option>Select city</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Field>
            </label>

            <label
              htmlFor="gender"
              className={`${classes.column} ${classes.fullWidth}`}
            >
              <span>Select Gender</span>
              <div>
                <MyInput name="gender" label="Male" type="radio" value="male" />
                <MyInput
                  name="gender"
                  label="Female"
                  type="radio"
                  value="female"
                />
                <MyInput
                  name="gender"
                  label="Other"
                  type="radio"
                  value="other"
                />
              </div>
            </label>
            <label
              htmlFor="skills"
              className={`${classes.column} ${classes.fullWidth}`}
            >
              <span>Skills</span>
              <div>
                <MyInput
                  name="skills"
                  type="checkbox"
                  label="React"
                  value="react"
                />
                <MyInput
                  name="skills"
                  type="checkbox"
                  label="Node.js"
                  value="node.js"
                />
                <MyInput
                  name="skills"
                  type="checkbox"
                  label="Python"
                  value="python"
                />
                <MyInput
                  name="skills"
                  type="checkbox"
                  label="Java"
                  value="java"
                />
                <MyInput
                  name="skills"
                  type="checkbox"
                  label="Other"
                  value="other"
                />
              </div>
            </label>
            <MyInput
              name="dob"
              type="date"
              label="Date of Birth"
              cssClass={classes.column}
            />
            <MyInput
              name="joiningDate"
              type="date"
              label="Joining Date"
              cssClass={classes.column}
            />
            <label className={`${classes.column} ${classes.fullWidth}`}>
              <span>Availability Period</span>
              <div>
                <MyInput name="dateRangeStart" type="date" label="From" />
                <MyInput name="joiningDate" type="date" label="To" />
              </div>
            </label>

            <MyInput
              name="coverLetter"
              cssClass={`${classes.column} ${classes.fullWidth}`}
              label="Cover Letter"
              as="textarea"
            />
            <MyInput
              name="resume"
              cssClass={classes.column}
              type="file"
              label="Upload Resume"
            />

            <MyInput
              name="conditionAcceptance"
              label="Accept Terms & Conditions"
              type="checkbox"
            />
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
