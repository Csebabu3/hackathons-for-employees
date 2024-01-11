import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Retrieve employee IDs from local storage
    const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeIds')) || [];
    const validEmployeeIds = storedEmployeeIds;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 8) {
            errors.password = '*Must be 8 characters or less';
        }

        return errors;
    };

    const handleFormSubmit = (values, actions) => {
        if (validEmployeeIds.includes(values.password)) {
            // Valid ID, navigate to home page
            navigate('/home');
        } else {
            // Invalid ID, show error message
            actions.setFieldError('password', 'Invalid Employee ID');
        }
    
        actions.setSubmitting(false);
    };
    
    return (
        <div className="container">
            <div className="card">
                <Formik
                    initialValues={{ password: '' }}
                    validate={validate}
                    onSubmit={handleFormSubmit}
                >
                    {() => (
                        <Form>
                            <h3 className='head'>Welcome to Hack Ideas</h3>
                            <h4 className='para'>Please Login...</h4>
                            <FormControl variant="standard" className='minput'>
                                <InputLabel htmlFor="standard-adornment-password">Employee Id</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" // Specify the field name
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <ErrorMessage name="password" style={{ color: 'red' }} component="div" className="error" />
                            </FormControl>
                            <div className="buttons">
                                <button type="submit" className="login-button">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
