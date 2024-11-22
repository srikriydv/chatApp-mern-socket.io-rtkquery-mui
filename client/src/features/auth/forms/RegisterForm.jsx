import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../authApiSlice";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import { useNavigate } from "react-router-dom"; // Import useNavigate

function RegisterForm() {
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();
    const navigate = useNavigate(); // Initialize navigate function

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const handleSubmit = async (values) => {
        try {
            // Attempt to register the user
            await registerUser(values).unwrap();

            // Show success toast
            toast.success("Registration successful! Please log in.");

            // Navigate to the login page after successful registration
            navigate("/login"); // Assuming your login route is '/login'
        } catch (err) {
            console.error(err);
            // Show error toast
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, marginTop: 25, boxShadow: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Register
            </Typography>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleChange, values }) => (
                    <Form>
                        <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                            {/* Name Field */}
                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    onChange={handleChange}
                                    value={values.name}
                                    placeholder="Name"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="name">
                                    {(msg) => <Typography color="error" variant="body2">{msg}</Typography>}
                                </ErrorMessage>
                            </Grid>

                            {/* Email Field */}
                            <Grid item xs={12}>
                                <Field
                                    type="email"
                                    name="email"
                                    as={TextField}
                                    label="Email"
                                    onChange={handleChange}
                                    value={values.email}
                                    placeholder="Email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="email">
                                    {(msg) => <Typography color="error" variant="body2">{msg}</Typography>}
                                </ErrorMessage>
                            </Grid>

                            {/* Password Field */}
                            <Grid item xs={12}>
                                <Field
                                    type="password"
                                    name="password"
                                    label="Password"
                                    as={TextField}
                                    onChange={handleChange}
                                    value={values.password}
                                    placeholder="Password"
                                    variant="outlined"
                                    fullWidth
                                />
                                <ErrorMessage name="password">
                                    {(msg) => <Typography color="error" variant="body2">{msg}</Typography>}
                                </ErrorMessage>
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
                                    {isLoading ? "Registering..." : "Register"}
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Error Message */}
                        {error && (
                            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
                                {error?.data?.message || "Something went wrong"}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default RegisterForm;