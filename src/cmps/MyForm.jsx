import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField, Button } from '@mui/material'
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
})

function CustomInput(props) {
    return (
        <TextField {...props} id="standard-basic" variant="standard" />
    )
}

export function MyForm() {
    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
    }
    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={defaultValues}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log('values', values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='formik'>
                        <Field as={CustomInput} name="firstName" label="first Name" />
                        {(errors.firstName && touched.firstName) && (
                            <div className='errors'>{errors.firstName}</div>
                        )}
                        <Field as={CustomInput} name="lastName" label="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div className='errors'>{errors.lastName}</div>
                        ) : null}
                        <Field as={CustomInput} name="email" label="email" type="email" />
                        {errors.email && touched.email ? <div className='errors'>{errors.email}</div> : null}

                        <Button sx={{ color: 'red', borderColor: 'red' }} type="submit" variant="outlined">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}