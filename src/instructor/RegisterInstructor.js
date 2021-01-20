import React from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../tool/FormikControl'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {DataApi} from '../API'


function RegisterInstructor(props) {
    const APIstring = DataApi;
    let history = useHistory();
    let email = localStorage.getItem('email');
    const initialValues = {
        RegisterDate: '',
        Email: email,
        FirstName: '',
        LastName: '',
        AuthorizedInstitution: '',
        InstructorLevel: 0,
        LisenceNum: 0,
        ExpireDate: '',
        TeachingArea: '',
        isActivate : false,
        Language: ''
    }
    const validationSchema = Yup.object({
        Email: Yup.string().email('Invalid email format').required('Required'),
        FirstName: Yup.string().required('Frist name is required'),
        LastName: Yup.string().required('Last name is required'),
        AuthorizedInstitution: Yup.string().required('Authorized institution is required'),
        InstructorLevel: Yup.number().min(1,'Please input a number').max(4,'Please input a number 1-4').required('Please input the instructor level'),
        LisenceNum: Yup.number().min(1,'Please input a number').required('Please input the lisence number'),
        ExpireDate: Yup.string().required('Please input a date'),
    })
    const onSubmit = (values) => {
        console.log(values);
        axios.post(`${APIstring}/instructor`, values)
            .then(res => {
                fetch(`${APIstring}/userPro/${email}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({
                        
                        "isInstructor": true    
                    })

                })
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            console.log(JSON.stringify(result));
                        }
                        
                    })
                    .catch(err=>{
                        alert('Error Message1: ' + JSON.stringify(err));
                    })
                // alert("email: "+values.email+" name: "+ values.name)
                alert('Your application has been accept: ' + JSON.stringify(res.data.message));
                history.push("/account")
            })
            .catch(err => {
                alert('Error Message: ' + JSON.stringify(err));
            })
    }
    return (
        <div>
            <div>
                <h4>Please fill the form. We will verify your application.</h4>
                
            </div>
            <br/>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (
                            <Form>
                                {/* <FormikControl control='input' type='email' label='Email *' name='email' /><br /> */}
                                <FormikControl control='input' type='FirstName' label='First Name *' name='FirstName' /><br />
                                <FormikControl control='input' type='LastName' label='Last Name *' name='LastName' /><br />
                                <FormikControl control='input' type='AuthorizedInstitution' label='Authorized Institution *' name='AuthorizedInstitution' /><br />
                                <FormikControl control='input' type='InstructorLevel' label='Instructor Level *' name='InstructorLevel' /><br />
                                <FormikControl control='input' type='LisenceNum' label='Lisence Number *' name='LisenceNum' /><br />
                                <FormikControl control='date' type='ExpireDate' label='Expire Date *' name='ExpireDate' /><br />
                                <FormikControl control='input' type='TeachingArea' label='Teaching Area *' name='TeachingArea' /><br />
                                <FormikControl control='input' type='Language' label='Language *' name='Language' /><br />
                                <button type='submit' disabled={!formik.isValid}>Submit</button>
                            </Form>
                        )

                    }
                }
            </Formik><br/><br/>
        </div>
    );
}

export default RegisterInstructor;