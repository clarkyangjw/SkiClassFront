
import React from 'react';
import axios from 'axios'
import { Formik, Form } from 'formik'
import FormikControl from '../tool/FormikControl'
import { DataApi } from '../API'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
//import Button from 'react-bootstrap/Button';


function ClassPost(props) {
    const APIstring = DataApi;
    // const [instructorProfile, setInstructorProfile] = useState({});
    // const [loading, setLoading] = useState(true);
    let history = useHistory();
    let token = localStorage.getItem('jwtToken');
    let email = localStorage.getItem('email');
    let insId = localStorage.getItem('instructorId');
    let insName = localStorage.getItem('instructorName');

    const leveLDropdownOptions = [
        { key: 'Select your level', value: '' },
        { key: 'Beginner', value: 'Beginner' },
        { key: 'Intermediate', value: 'Intermediate' },
        { key: 'Advanced', value: 'Advanced' }
    ]

    const ClassTypeDropdownOptions = [
        { key: 'Select class type', value: '' },
        { key: 'Group', value: 'Group' },
        { key: 'Semi', value: 'Semi' },
        { key: 'Private', value: 'Private' }
    ]

    const initialValues = {

        instructorName: insName,
        InstructorId: insId,
        instructorEmail: email,
        IsCancel: false,
        classDate: '',
        classTime: '',
        classHours: '',
        classLocation: '',
        classLevel: '',
        classDes: '',
        classCap: '',
        classType: '',
        minAge: 0,
        maxAge: 100,
        Price: '',
        RegistedNumber: 0
    }
    const validationSchema = Yup.object({
        classDate: Yup.string().required('Please input a date'),
        classTime: Yup.string().required('Please input a time. eg:"1pm-3pm"'),
        classHours: Yup.number().required('Please input a number'),
        classLocation: Yup.string().required('Please input a time. eg:"1pm-3pm"'),
        classLevel: Yup.string().required('Please input "beginner, intermidiate or advanced"'),
        classDes: Yup.string().required('Please input class description, eg: meeting eara'),
        classCap: Yup.number().required('Please input the class capacity'),
        classType: Yup.string().required('Please choice a class type.'),
        minAge: Yup.number().required('Please input the minimum age of the class'),
        maxAge: Yup.number().required('Please input the maximum age of the class'),
        Price: Yup.number().required('Please input the price of the class'),

    })

    const onSubmit = (values) => {
        axios.post(`${APIstring}/class`, values, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            alert('Your class has posted: ' + JSON.stringify(res.data.message))
            history.push("/instructorAccount");
        })
            .catch(err => {
                alert('Error Message: ' + JSON.stringify(err));
            })
    }

    return (
        <div>
            <h4>Please input the class information</h4>
            <br />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (
                            <Form>
                                {/* <FormikControl control='input' type='email' label='Email *' name='email' /><br /> */}
                                <FormikControl control='date' type='classDate' label='Class Date *' name='classDate' /><br />
                                <FormikControl control='input' type='classTime' label='Class Time *' name='classTime' /><br />
                                <FormikControl control='input' type='classHours' label='Class Hours *' name='classHours' /><br />

                                <FormikControl control='input' type='classLocation' label='Class Location *' name='classLocation' /><br />

                                <FormikControl control='select' type='classLevel' label='Class Level *' name='classLevel' options={leveLDropdownOptions} /><br />
                                <FormikControl control='select' type='classType' label='classType *' name='classType' options={ClassTypeDropdownOptions} /><br />
                                <FormikControl control='input' type='classCap' label='Class Capacity *' name='classCap' /><br />

                                <FormikControl control='input' type='minAge' label='Min Age *' name='minAge' /><br />
                                <FormikControl control='input' type='maxAge' label='Max Age *' name='maxAge' /><br />
                                <FormikControl control='input' type='Price' label='Price *' name='Price' /><br />
                                <FormikControl control='textarea' type='classDes' label='Class Description *' name='classDes' /><br /><br /><br />
                                <button type='submit' disabled={!formik.isValid}>Submit</button>
                            </Form>
                        )

                    }
                }
            </Formik><br /><br />
        </div>
    )
    // const [classData, setClassData] = useState(null);
    // useEffect(() => {
    //     setClassData({
    //         instructorName: "Jason Borne",
    //         instructorEmail: "110@skiexpert.com",
    //         classDate: " ",
    //         classTime: " ",
    //         classHours: " ",
    //         classLocation: "wer",
    //         classLevel: "Strsdaing",
    //         classDes: "Stczxcring",
    //         classCap: "",
    //         classType: "Strizxcng",
    //         minAge: 0,
    //         maxAge: 100,
    //         Price: "",
    //         RegistedNumber: ""
    //     });
    // }, []);

    // const handleSubmit = (e) => {
    //     alert('A form was submitted: ' + JSON.stringify(classData));
    //     e.preventDefault();
    //     axios.post(`${APIstring}/class`, classData)
    //         .then(res => {
    //             alert('A form was submitted: ' + JSON.stringify(classData));
    //         })
    //         .catch(err => {
    //             alert(err);
    //         })

    // }

    // const handleChange = (e) => {

    //     let target = e.target; // the element that initiated the event
    //     let value = target.value; // its value
    //     let name = target.name; // its name

    //     if (target.type === 'checkbox') {
    //         value = target.checked
    //     } else if (target.type === 'select-multiple') {
    //         value = [];
    //         for (let i = 0; i < target.options.length; i++) {
    //             if (target.options[i].selected) {
    //                 value.push(target.options[i].value);
    //             }
    //         }
    //     }
    //     else {
    //         value = target.value
    //     }

    //     let newClassData = { ...classData }; // preform a "shallow" clone of userData        
    //     newClassData[name] = value; // update the associated property for the control
    //     setClassData(newClassData); // set the new user data


    // }

    // if (!classData) {
    //     return null;
    // } else {
    //     return (
    //         <div>
    //             <Form onSubmit={handleSubmit} >
    //                 <label>
    //                     Class date:
    //             <input type="date" name="classDate" value={classData.classDate} onChange={handleChange} />
    //                 </label><br />


    //                 <label>
    //                     Class time:
    //             <input type="text" name="classTime" value={classData.classTime} onChange={handleChange} />
    //                 </label><br />

    //                 <label>
    //                     Class hours:
    //             <input type="number" name="classHours" value={classData.classHours} onChange={handleChange} />
    //                 </label><br />

    //                 <label>
    //                     Class location:
    //             <input type="text" name="classLocation" value={classData.classLocation} onChange={handleChange} />
    //                 </label><br />

    //                 <label>Class level:</label><br />
    //                 <label>
    //                     Beginner <input name="classLevel" type="radio" checked={classData.classLevel === "Beginner"} value="Beginner" onChange={handleChange} />
    //                 </label>
    //                 <label>
    //                     Intermediate <input name="classLevel" type="radio" checked={classData.classLevel === "Intermediate"} value="Intermediate" onChange={handleChange} />
    //                 </label>
    //                 <label>
    //                     Advanced <input name="classLevel" type="radio" checked={classData.classLevel === "Advanced"} value="Advanced" onChange={handleChange} />
    //                 </label>
    //                 <br />

    //                 <label>
    //                     Instructor name:
    //             <input type="text" name="instructorName" value={classData.instructorName} onChange={handleChange} />
    //                 </label><br />

    //                 <label>
    //                     Instructor number:
    //             <input type="number" name="instructorNum" value={classData.instructorNum} onChange={handleChange} />
    //                 </label><br />
    //                 <label>
    //                     Class description:
    //             <textarea type="text" name="classDes" value={classData.classDes} onChange={handleChange} />
    //                 </label><br />


    //                 <label>
    //                     Class capacity:
    //             <input type="number" name="classCap" value={classData.classCap} onChange={handleChange} />
    //                 </label><br />

    //                 <label>Class type:</label><br />
    //                 <label>
    //                     Groupe <input name="classType" type="radio" checked={classData.classType === "Groupe"} value="Groupe" onChange={handleChange} />
    //                 </label>
    //                 <label>
    //                     Semi <input name="classType" type="radio" checked={classData.classType === "Semi"} value="Semi" onChange={handleChange} />
    //                 </label>
    //                 <label>
    //                     Private <input name="classType" type="radio" checked={classData.classType === "Private"} value="Private" onChange={handleChange} />
    //                 </label>
    //                 <br />

    //                 <label>
    //                     Class price:
    //             <input type="number" name="Price" value={classData.Price} onChange={handleChange} />
    //                 </label><br />

    //                 <button type="submit">Submit</button>

    //             </Form>
    //         </div>
    //     );
    // }

}

export default ClassPost;