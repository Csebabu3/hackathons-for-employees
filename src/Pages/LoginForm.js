import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validEmployeeIds, setValidEmployeeIds] = useState([]);
  const navigate = useNavigate()

  const initialValues = {
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Add your form submission logic here
    console.log(values);
    const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeIds')) || [];

    if (storedEmployeeIds.includes(values.password)) {
      // Valid ID, navigate to home page
      console.log('Successfully logged in!');
      navigate('/home');
    } else {
      // Invalid ID, you may want to handle this case accordingly
      console.log('Invalid login credentials!');
    }

    setSubmitting(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    // Retrieve employee IDs from local storage on component mount
    if (localStorage.getItem('employeeIds')) {
      setValidEmployeeIds(JSON.parse(localStorage.getItem('employeeIds')));
    }
  }, []);

  useEffect(() => {
    // Set 3 employee IDs in local storage on component mount
    const initialEmployeeIds = ['11201', '11202', '11203'];
    setValidEmployeeIds(initialEmployeeIds);
    localStorage.setItem('employeeIds', JSON.stringify(initialEmployeeIds));
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = 'Required';
        }
        else if (!values.password) {
          errors.password = 'Invalid';
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleBlur, isSubmitting }) => (

        <div className='container'>
          <div className='card'>
            <Form>
              <h3 className="head">Welcome to Hack Ideas</h3>
              <h4 className="para">Please Login...</h4>

              <FormControl variant="standard" className="minput">
                <InputLabel htmlFor="password">Employee Id</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                <ErrorMessage name="password" style={{ color: 'red', fontWeight: 'bolder' }} component="div" className="error" />
              </FormControl>
              <div className="buttons">
                <button type="submit" className="login-button" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
