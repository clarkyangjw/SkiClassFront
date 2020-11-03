import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function MyAccount(props) {

    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const APIstring = "https://sheltered-stream-35085.herokuapp.com/api";
    // const [myId, setMyId] = useState();
    //const [found, setFound] = useState(false);
    let history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        let email = localStorage.getItem('email');
        // alert(email + token);
        fetch(`${APIstring}/userPro/${email}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setProfile(result);
                    // alert(profile);
                    // console.log(profile.Reviews.length)
                    //setFound(true); // we found some data
                    setLoading(false); // no longer loading
                } else {
                    // setFound(false); // we did not find any data
                    setLoading(false); // no longer loading
                }
            });
    }, [props.id]);

    function cancelClickHandler(id) {
        const classId = id
        let RegistedNum = 0;
        let token1 = localStorage.getItem('jwtToken');
        let email = localStorage.getItem('email');
        // alert(email + token1)
        fetch(`${APIstring}/userPro/${email}`, {
            method: "GET",
            headers: {
                'Authorization': token1
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data

                    let curClass = result.reservedClass;
                    // alert("My class: " + JSON.stringify(curClass));
                    for (let i = 0; i < curClass.length; i++) {
                        if (curClass[i].class._id === classId) {
                            curClass[i].isCancel = true;
                            // alert(curClass[i].isCancel);
                            console.log("My class: " + JSON.stringify(curClass));
                           
                        }
                    }
                    fetch(`${APIstring}/userPro/${email}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            "reservedClass": curClass
                        })

                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result) {
                                console.log(JSON.stringify(result));
                            }
                            // history.push("/account")
                        });
                    // console.log(profile.Reviews.length)
                    //setFound(true); // we found some data
                    // setLoading(false); // no longer loading
                } else {
                    // setFound(false); // we did not find any data
                    // setLoading(false); // no longer loading
                }
            });



        let token = localStorage.getItem('jwtToken');
        
        fetch(`${APIstring}/class/${classId}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data

                    RegistedNum = result.RegistedNumber;
                    
                    RegistedNum--;
                    
                    fetch(`${APIstring}/class/${classId}`, {
                        method: "PUT",
                        headers: {
                            'Authorization': token,
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            "RegistedNumber": RegistedNum
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result) {

                                console.log(JSON.stringify(result));
                                alert("Class cancel successfully!");
                                window.location.href="/account"
                            }
                        });
                } else {

                }
            });

    }

    //alert(found);
    if (loading) {
        return (
            <div>
                <h4>My account {props.id} loading... </h4>
            </div>
        ); // could have a loading spinner, etc here {this.state.classes.map(cla =>   profile.Reviews.map(lo=>("#"+lo + " "))} profile.Reviews.legth}
    } else {
        if (true) {
            return (

                <div>


                    <h3 >Hi <span style={{ color: "BlueViolet", fontFamily: "Menlo" }}>{profile.name}</span>!</h3>
                    <br />
                    <h4><a style={{ cursor: "pointer"}} onClick={() => { history.push(`/userpro/${profile.email}`) }}>Editerr </a> my profile</h4>
                    <br />
                    <ul className="list-group">
                        <li className="list-group-item"><strong>My Sport: </strong>{profile.skiSnowboard} </li>
                        <li className="list-group-item"><strong>Level: </strong> {profile.skiLevel}</li>
                        <li className="list-group-item"><strong>Favorite Location: </strong> {profile.favoriteLocation.map(loca => ("@" + loca + " "))}</li>
                        <li className="list-group-item"><strong>Taget: </strong> {profile.Taget.map(Tag => ("#" + Tag + " "))}</li>
                        <li className="list-group-item"><strong>Review: </strong> {(profile.Reviews.length === 0) ? "No review right now" : profile.Reviews.map(review => ("#" + review + " "))}</li>
                        {/* <li className="list-group-item"><strong>Reserved class: </strong> {(profile.reservedClass.length === 0) ? "I have'nt reserve a class" : profile.reservedClass.map(lo => ("#" + lo + " "))}</li> */}
                    </ul>
                    <div >


                        <div>{(profile.reservedClass.length === 0) ?
                            <div><h4>I have'nt reserve a class</h4>

                            </div> : <div>

                                <h4 style={{ color: "Green" }}>My reserved class:</h4>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Reserve Date</th>
                                            <th>Location</th>
                                            <th>Class Date</th>
                                            <th>Class Time</th>
                                            <th>Class Level</th>
                                            <th>Instructor</th>
                                            <th>Instructor Email</th>
                                            <th>Price</th>
                                            <th>Notice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profile.reservedClass.map(cla => ((cla.isCancel) ? '' :
                                            <tr >
                                                <td>{new Date(cla.reserveDate).toLocaleDateString()}</td>
                                                <td>{cla.class.classLocation}</td>
                                                <td>{new Date(cla.class.classDate).toLocaleDateString()}</td>
                                                <td>{cla.class.classTime}</td>
                                                <td>{cla.class.classLevel}</td>
                                                <td>{cla.class.instructorName}</td>
                                                <td>{cla.class.instructorEmail}</td>
                                                <td>{(cla.class.Price === 0 || isNaN(cla.class.Price)) ? "Free" : `$ ${cla.class.Price}`}</td>
                                                <td>{cla.class.classDes}</td>
                                                <button onClick={() => cancelClickHandler(cla.class._id)} >Cancel class</button>
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>
                                <h4 style={{ color: "red" }}>My cancelled class:</h4>
                                <Table hover>

                                    <thead>
                                        <tr>
                                            <th>Reserve Date</th>
                                            <th>Location</th>
                                            <th>Class Date</th>
                                            <th>Class Time</th>
                                            <th>Class Level</th>
                                            <th>Instructor</th>
                                            <th>Instructor Email</th>
                                            <th>Price</th>
                                            <th>Notice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {profile.reservedClass.map(cla => ((!cla.isCancel) ? '' :
                                            <tr >
                                                <td>{new Date(cla.reserveDate).toLocaleDateString()}</td>
                                                <td>{cla.class.classLocation}</td>
                                                <td>{new Date(cla.class.classDate).toLocaleDateString()}</td>
                                                <td>{cla.class.classTime}</td>
                                                <td>{cla.class.classLevel}</td>
                                                <td>{cla.class.instructorName}</td>
                                                <td>{cla.class.instructorEmail}</td>
                                                <td>{(cla.class.Price === 0 || isNaN(cla.class.Price)) ? "Free" : `$ ${cla.class.Price}`}</td>
                                                <td>{cla.class.classDes}</td>
                                                {/* <button onClick={() => cancelClickHandler(cla.class._id)} >Cancel class</button> */}
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>
                            </div>}
                        </div>

                    </div>


                    <Link className="btn btn-primary" to="/classes">Find a class</Link>
                </div>
            );
        } else {
            return <Redirect to={{ pathname: "/notFound" }} />
        }
    }
}

export default MyAccount;