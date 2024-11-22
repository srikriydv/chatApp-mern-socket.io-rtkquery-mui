import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import * as Yup from "yup"; // For form validation
import { useLoginUserMutation } from "../authApiSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Form submission handler
  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log("Logged in successfully:", response);
      setTimeout(() => {
        navigate("/"); // Navigate to home page on successful login
      }, 3000); // Navigate to home page on successful login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2, boxShadow: 2, marginTop: 25 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Grid item xs={12}>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  as={TextField}
                  value={values.email}
                  onChange={handleChange}
                />
                <ErrorMessage name="email">
                  {(msg) => <Typography color="error" variant="body2">{msg}</Typography>}
                </ErrorMessage>
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  as={TextField}
                  value={values.password}
                  onChange={handleChange}
                />
                <ErrorMessage name="password">
                  {(msg) => <Typography color="error" variant="body2">{msg}</Typography>}
                </ErrorMessage>
              </Grid>

              {/* Login Error Message */}
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error?.data?.message || "Login failed"}
                  </Typography>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </Grid>

              {/* Registration Link */}
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;