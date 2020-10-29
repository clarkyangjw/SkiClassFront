import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './tool/FormikControl'
// import { Context } from "./Context";
import axios from 'axios'
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const APIstring = "https://sheltered-stream-35085.herokuapp.com/api";
    // const [context, setContext] = useContext(Context);
    
    
    let history = useHistory();
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('required'),
        password: Yup.string().required('required')
    })
    
    const onSubmit = (values) => {
        // alert(values);
        axios.post(`${APIstring}/login`, values)
            .then(res => {
                localStorage.setItem('email', values.email)
                localStorage.setItem('login', true)
                localStorage.setItem('jwtToken', "JWT "+ JSON.stringify(res.data.token).slice(1,-1))
                // window.location.reload();
                window.location.href="/"
                // history.push("/")
                // setContext(true)
                // console.log(true);
            })
            .catch(err => {
                alert('Message: passwords does not match the email. Please input correctly!' );
            })
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (

                            <Form>
                                <br/>
                                <FormikControl control='input' type='email' label='Email' name='email' /><br />
                                <FormikControl control='input' type='password' label='Password' name='password' /><br />
                                <button type='submit' disabled={!formik.isValid}>Login</button>
                            </Form>
                        )
                    }
                }
                {/* <Link className="btn btn-primary" to="/register">register</Link> */}
            </Formik><br/><br/>
            <h4>Doesn't have a account?  <a  onClick={()=>{history.push(`/register`)}}>  Register now </a> and reserve you class!</h4>
            
        </div>


    );
}

export default Login;

