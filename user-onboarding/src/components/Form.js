import React, { useState, useEffect } from 'react';
import {withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({
    values, 
    errors, 
    touched,
    status
}) => {
    console.log('values', values);
    console.log('errors', errors);
    console.log('touched, touched');

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        console.log('STATUS CHANGED', status);
        status && setUsers(users => [
            ...users, status
        ]);
    }, [status]);

    return (
        <div> 
        <Form>
            <label htmlFor = 'name' className='name'> 
            Name:
            <Field
              id='name'
              type='text'
              name='name'
              placeholder='Name'/>
            {touched.name && 
            errors.name && (
              <p className='errors'>
                {errors.name}
              </p>
            )}
          </label>
  
          <label htmlFor='email' className='email'>
            Email: 
            <Field
              id='email'
              type='email'
              name='email'
              placeholder='Email'/>
            {touched.email && 
            errors.email && (
              <p className='errors'>
                {errors.email}
              </p>
            )}
          </label>
  
          <label htmlFor='password' className='password'>
            Password:
            <Field
              id='password'
              type='password'
              name='password'
              placeholder='Password'/>
            {touched.password && 
            errors.password && (
              <p className='errors'>
                {errors.password}
              </p>
            )}
          </label>
          <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        I Accept Terms of Service
      </label>
      <button type='submit'>Submit</button>
      </Form>
      
        {users.map(user => {
            return (
                <ul key={user.id}>
                <li>
                  Name: {user.name}
                </li>
                <li>
                  Email: {user.email}
                </li>
                <li>
                  Password: {user.password}
                </li>   
                </ul>
                
            )
            
        })}</div>
    )

};

const FormikUserForm = withFormik({

    mapPropsToValues(props) {
  
      return {
        name: props.name || '',
        email: props.email || '',
        password: props.password || '',
        tos: props.tos || false  
      };
    },
  

    
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name required'),
      email: Yup.string()
      .email("Email not valid")
      .required('Email required'),
      password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required('Password required')
    }),
  
    handleSubmit(
      values,
      { setStatus, resetForm }
    ) {
  
      console.log('submitted', values);
  
      axios
        .post(
          'https://reqres.in/api/users',
          values
        )
        .then(response => {
          console.log('woohoo!', response);
  
          setStatus(response.data);
  
          resetForm();
        })
        .catch(error => 
          console.log(error.response)
        );
    }
  })(UserForm);
  
  export default FormikUserForm;



/*import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
  return (
    < form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <Field component="select" name="meal">
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="platinum">Platinum</option>
      </Field>
      <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, meal }) {
    return {
      email: email || "",
      password: password || "",
      tos: tos || false,
      meal: meal || "silver"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(16, "Password must be 16 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytaken@atb.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://yourdatabaseurlgoeshere.com", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;*/