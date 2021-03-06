import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../tool/FormikControl'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {DataApi} from '../API'

function Register(props) {
    const APIstring = DataApi;
    let history = useHistory();
    const initialValues = {
        email: '',
        password: '',
        password2: '',
        name: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
        password2: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required'),
    })

    const onSubmit = (values) => {

        axios.post(`${APIstring}/register`, values)
            .then(res => {
                //alert('A form was submitted: ' + JSON.stringify(values));
                axios.post(`${APIstring}/userPro`, values).then(res =>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
                // alert("email: "+values.email+" name: "+ values.name)
                alert('Message: ' + JSON.stringify(res.data.message));
                history.push("/login")
            })
            .catch(err => {
                alert('Error Message: ' + JSON.stringify(err));
            })
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (

                            <Form>
                                <FormikControl control='input' type='email' label='Email *' name='email' /><br />
                                <FormikControl control='input' type='password' label='Password *' name='password' /><br />
                                <FormikControl control='input' type='password' label='Confirm Password *' name='password2' /><br />
                                <FormikControl control='input' type='name' label='name' name='name' /><br />
                                <button type='submit' disabled={!formik.isValid}>Submit</button>
                            </Form>
                        )

                    }
                }
            </Formik><br/><br/>

            {/* <h4>After register, click to login!</h4>
            <Link className="btn btn-primary" to="/login">Login</Link> */}
        </div>

    );
}

export default Register;