
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form } from 'react-bootstrap'
//import Button from 'react-bootstrap/Button';


function ClassPost(props) {
    const APIstring = "https://sheltered-stream-35085.herokuapp.com/api";
    const [classData, setClassData] = useState(null);
    useEffect(() => {
        setClassData({
            instructorName: "Jason Borne",
            instructorEmail: "110@skiexpert.com",
            classDate: " ",
            classTime: " ",
            classHours: " ",
            classLocation: "wer",
            classLevel: "Strsdaing",
            classDes: "Stczxcring",
            classCap: "",
            classType: "Strizxcng",
            Price: "",
            RegistedNumber: ""
        });
    }, []);

    const handleSubmit = (e) => {
        alert('A form was submitted: ' + JSON.stringify(classData));
        e.preventDefault();
        axios.post(`${APIstring}/class`, classData)
            .then(res => {
                alert('A form was submitted: ' + JSON.stringify(classData));
            })
            .catch(err => {
                alert(err);
            })

    }

    const handleChange = (e) => {

        let target = e.target; // the element that initiated the event
        let value = target.value; // its value
        let name = target.name; // its name

        if (target.type === 'checkbox') {
            value = target.checked
        } else if (target.type === 'select-multiple') {
            value = [];
            for (let i = 0; i < target.options.length; i++) {
                if (target.options[i].selected) {
                    value.push(target.options[i].value);
                }
            }
        }
        else {
            value = target.value
        }

        let newClassData = { ...classData }; // preform a "shallow" clone of userData        
        newClassData[name] = value; // update the associated property for the control
        setClassData(newClassData); // set the new user data


    }

    if (!classData) {
        return null;
    } else {
        return (
            <div>
                <Form onSubmit={handleSubmit} >
                    <label>
                        Class date:
                <input type="date" name="classDate" value={classData.classDate} onChange={handleChange} />
                    </label><br />


                    <label>
                        Class time:
                <input type="text" name="classTime" value={classData.classTime} onChange={handleChange} />
                    </label><br />

                    <label>
                        Class hours:
                <input type="number" name="classHours" value={classData.classHours} onChange={handleChange} />
                    </label><br />

                    <label>
                        Class location:
                <input type="text" name="classLocation" value={classData.classLocation} onChange={handleChange} />
                    </label><br />

                    <label>Class level:</label><br />
                    <label>
                        Beginner <input name="classLevel" type="radio" checked={classData.classLevel === "Beginner"} value="Beginner" onChange={handleChange} />
                    </label>
                    <label>
                        Intermediate <input name="classLevel" type="radio" checked={classData.classLevel === "Intermediate"} value="Intermediate" onChange={handleChange} />
                    </label>
                    <label>
                        Advanced <input name="classLevel" type="radio" checked={classData.classLevel === "Advanced"} value="Advanced" onChange={handleChange} />
                    </label>
                    <br />

                    <label>
                        Instructor name:
                <input type="text" name="instructorName" value={classData.instructorName} onChange={handleChange} />
                    </label><br />

                    <label>
                        Instructor number:
                <input type="number" name="instructorNum" value={classData.instructorNum} onChange={handleChange} />
                    </label><br />
                    <label>
                        Class description:
                <textarea type="text" name="classDes" value={classData.classDes} onChange={handleChange} />
                    </label><br />


                    <label>
                        Class capacity:
                <input type="number" name="classCap" value={classData.classCap} onChange={handleChange} />
                    </label><br />

                    <label>Class type:</label><br />
                    <label>
                        Groupe <input name="classType" type="radio" checked={classData.classType === "Groupe"} value="Groupe" onChange={handleChange} />
                    </label>
                    <label>
                        Semi <input name="classType" type="radio" checked={classData.classType === "Semi"} value="Semi" onChange={handleChange} />
                    </label>
                    <label>
                        Private <input name="classType" type="radio" checked={classData.classType === "Private"} value="Private" onChange={handleChange} />
                    </label>
                    <br />

                    <label>
                        Class price:
                <input type="number" name="Price" value={classData.Price} onChange={handleChange} />
                    </label><br />
                    
                    <button type="submit">Submit</button>

                </Form>
            </div>
        );
    }
    // return (
    //     <div>

    //     </div>
    // );
}

export default ClassPost;