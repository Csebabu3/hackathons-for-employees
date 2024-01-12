// import React, { useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [validEmployeeIds, setValidEmployeeIds] = useState([]);
//     const navigate = useNavigate();
//     useEffect(() => {
//         // Set 3 employee IDs in local storage
//         const initialEmployeeIds = ['11201', '11202', '11203'];
//         localStorage.setItem('employeeIds', JSON.stringify(initialEmployeeIds));

//         // Retrieve employee IDs from local storage

//     }, []);

//     useEffect(() => {
//         const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeIds')) || [];
//         setValidEmployeeIds(storedEmployeeIds);
//         console.log(validEmployeeIds);
//     }, []);
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const validate = (values) => {
//         const errors = {};
//         // if (!values.password) {
//         //     errors.password = 'This field is Required';
//         // } 
//         return errors;
//     };

//   // ... (previous code)

// const handleFormSubmit = (values, actions) => {
//     if (validEmployeeIds.includes(values.password)) {
//         // Valid ID, navigate to home page
//         navigate('/home');
//         console.log('Successfully logged in!');
//     } else {
//         // Invalid ID, show error message
//         actions.setFieldError('password', 'Invalid Employee ID');
//         console.log('Login failed. Invalid Employee ID.');
//     }

//     actions.setSubmitting(false);
// };




//     return (
//         <div className="container">
//             <div className="card">
//                 <Formik
//                     initialValues={{ password: '' }}
//                     validate={validate}
//                     onSubmit={handleFormSubmit}
//                 >
//                     {() => (
//                         <Form>
//                             <h3 className='head'>Welcome to Hack Ideas</h3>
//                             <h4 className='para'>Please Login...</h4>
//                             <FormControl variant="standard" className='minput'>
//                                 <InputLabel htmlFor="standard-adornment-password">Employee Id</InputLabel>
//                                 <Input
//                                     id="standard-adornment-password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password" // Specify the field name
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 onClick={handleClickShowPassword}
//                                                 onMouseDown={handleMouseDownPassword}
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                 />
//                                 <ErrorMessage name="password" style={{ color: 'red', fontWeight: "bolder" }} component="div" className="error" />
//                             </FormControl>
//                             <div className="buttons">
//                                 <button type="submit" className="login-button">
//                                     Submit
//                                 </button>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
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
    const [validEmployeeIds, setValidEmployeeIds] = useState([]);
    const navigate = useNavigate();

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

    const handleFormSubmit = (values, actions) => {
        // Retrieve employee IDs from local storage
        const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeIds')) || [];
        console.log(storedEmployeeIds);
        console.log(values.password);
        console.log(storedEmployeeIds.indexOf(values.password));
        console.log(storedEmployeeIds.includes(values.password));
        if (storedEmployeeIds.includes(values.password)) {
            // Valid ID, navigate to home page
            navigate('/home');
            console.log('Successfully logged in!');
        } else {
            // Invalid ID, show error message
            actions.setFieldError('password', 'Invalid Employee ID');
            console.log('Login failed. Invalid Employee ID.');
        }

        actions.setSubmitting(false);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <div className="card">
                <Formik
                    initialValues={{ password: '' }}
                    validate={values => {
                      const errors = {};
                      if (!values.password) {
                        errors.password = 'Required';
                      }
                      return errors;
                    }}
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
                                    name="password"
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
                                <ErrorMessage name="password" style={{ color: 'red', fontWeight: "bolder" }} component="div" className="error" />
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
