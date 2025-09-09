import { Form, Link } from "react-router-dom";
import classes from "./Login.module.css";
import { ErrorMessage, Field, Formik } from "formik";
import { validationSchemaForLogin } from "../utils/LoginValidationSchema";

export default function Login() {
  return (
    <div className={classes.main}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchemaForLogin}
        onSubmit={(data) => console.log(data)}
      >
        <Form>
          <Field name="email"></Field>
          <ErrorMessage name="email"></ErrorMessage>
          <Field name="password"></Field>
          <ErrorMessage name="password"></ErrorMessage>
        </Form>
      </Formik>
      <Link to="/register">create account</Link>
    </div>
  );
}
