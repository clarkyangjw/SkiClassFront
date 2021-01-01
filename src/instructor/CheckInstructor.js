import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { DataApi } from '../API'


function CheckInstructor(props) {

    const [instructorProfile, setInstructorProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const APIstring = DataApi;
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        fetch(`${APIstring}/instructor/${props.id}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setInstructorProfile(result);
                    setLoading(false); // no longer loading
                } else {
                    console.log("result");
                    setLoading(false); // no longer loading
                }
            });

    }, [])

    if (loading) {
        return (
            <div>
                Instructor profile is loading...
            </div>
        );
    } else {
        if (true) {
            return (
                instructorProfile.isActivate ?
                    <div>
                        <h4>Instructor Profile:</h4>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Full Name: </strong>{instructorProfile.FirstName} {instructorProfile.LastName}</li>
                            <li className="list-group-item"><strong>Authorized Institution: </strong>{instructorProfile.AuthorizedInstitution} </li>
                            <li className="list-group-item"><strong>Level: </strong> {instructorProfile.InstructorLevel}</li>
                            <li className="list-group-item"><strong>Lisence Number: </strong> {instructorProfile.LisenceNum}</li>
                            <li className="list-group-item"><strong>Expire Date: </strong> {new Date(instructorProfile.ExpireDate).toLocaleDateString()}</li>
                        </ul>

                    </div>
                    :
                    <div>
                        <h3>Instructor {instructorProfile.FirstName} {instructorProfile.LastName} is not active</h3>

                    </div>
            )
        } else {
            return <Redirect to={{ pathname: "/notFound" }} />
        }
    }
}

export default CheckInstructor;