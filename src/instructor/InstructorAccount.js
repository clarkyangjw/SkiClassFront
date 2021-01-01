import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { DataApi } from '../API'
import { Table } from 'react-bootstrap'


function InstructorAccount(props) {

    const [instructorProfile, setInstructorProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [classLoading, setClassLoading] = useState(false);
    const [instructorClasses, setInstructorClasses] = useState({});
    const APIstring = DataApi;
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        let email = localStorage.getItem('email');
        // console.log(email);
        // console.log(token);
        fetch(`${APIstring}/instructor/${email}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setInstructorProfile(result);
                    localStorage.setItem('instructorName', result.FirstName);
                    localStorage.setItem('instructorId', result.InstructorID);


                    fetch(`${APIstring}/instructorClass/${email}`, {
                        method: "GET",
                        headers: {
                            'Authorization': token
                        }
                    }).then(res => res.json())
                        .then(classes => {
                            if (classes.length > 0) {
                                setInstructorClasses(classes);
                                setClassLoading(true);
                            }
                        }).catch(err => {
                            alert("get class error: " + JSON.stringify(err))
                        })
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
                        <h3 >Hi Snow pro!</h3>
                        <br />
                        <h4>My Lisence:</h4>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Full Name: </strong>{instructorProfile.FirstName} {instructorProfile.LastName}</li>
                            <li className="list-group-item"><strong>Authorized Institution: </strong>{instructorProfile.AuthorizedInstitution} </li>
                            <li className="list-group-item"><strong>Level: </strong> {instructorProfile.InstructorLevel}</li>
                            <li className="list-group-item"><strong>Lisence Number: </strong> {instructorProfile.LisenceNum}</li>
                            <li className="list-group-item"><strong>Expire Date: </strong> {new Date(instructorProfile.ExpireDate).toLocaleDateString()}</li>
                        </ul>

                        <Link className="btn btn-primary" to="/classPost">Post a class</Link>
                        {
                            classLoading ?
                                <div>
                                    <br />
                                    <h4>My post</h4>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Class Id</th>
                                                <th>Location</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                
                                                <th>Class Level</th>
                                                <th>Class Type</th>
                                                <th>Price</th>
                                                <th>Class Capacity</th>
                                                <th>Avaliable Site</th>
                                                
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {instructorClasses.map(cla => (
                                                //onClick={() => { this.props.history.push(`/class/${cla._id}`) }}
                                                <tr key={cla._id} >
                                                    <td>{cla.classId}</td>
                                                    <td>{cla.classLocation}</td>
                                                    <td>{new Date(cla.classDate).toLocaleDateString()}</td>
                                                    <td>{cla.classTime}</td>
                                                    
                                                    <td>{cla.classLevel}</td>
                                                    <td>{cla.classType}</td>
                                                    <td> {(cla.Price === 0 || isNaN(cla.Price)) ? "Free" : `$ ${cla.Price}`}</td>
                                                    <td>{cla.classCap}</td>
                                                    <td>{(cla.classCap - cla.RegistedNumber) > 0 ? (cla.classCap - cla.RegistedNumber) : "Full"}</td>
                                                    {/* <td>{cla.classCap - cla.RegistedNumber}</td> */}
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                </div>
                                :
                                <div>
                                    <br />
                                    <h4>I have not posted a class</h4>
                                </div>
                        }


                    </div>
                    :
                    <div>
                        <h3>Your Instructor information is being verified, Please wait. We may take up to 48 hours to verify your profile.
                            You can access this page once your profile is verified.</h3>

                    </div>
            )
        } else {
            return <Redirect to={{ pathname: "/notFound" }} />
        }
    }

}

export default InstructorAccount;