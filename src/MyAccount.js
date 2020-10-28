import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function MyAccount(props) {

    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    // const [myId, setMyId] = useState();
    //const [found, setFound] = useState(false);
    let history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        let email = localStorage.getItem('email');
        fetch(`https://quiet-earth-26628.herokuapp.com/api/userPro/${email}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setProfile(result);
                    
                    // console.log(profile.Reviews.length)
                    //setFound(true); // we found some data
                    setLoading(false); // no longer loading
                } else {
                    // setFound(false); // we did not find any data
                    setLoading(false); // no longer loading
                }
            });
    }, [props.id]);

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

                    
                    <h3 >Hi <span style={{color: "BlueViolet",fontFamily: "Menlo"}}>{profile.name}</span>!</h3>
                    <br />
                    <h4><a  onClick={()=>{history.push(`/userpro/${profile.email}`)}}>Editer </a> my profile</h4>
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
                        <h4>My class:</h4>
                        <div>{(profile.reservedClass.length === 0) ?
                            <div>I have'nt reserve a class

                        </div> :
                            <Table hover>
                            <thead>
                                <tr>
                                    <th>Reserve Date</th>
                                    <th>Location</th>
                                    <th>Class Date</th>
                                    <th>Class Time</th>
                                    <th>Class Level</th>
                                    <th>Instructor</th>
                                    <th>Price</th>
                                    <th>Notice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profile.reservedClass.map(cla => (
                                    <tr >
                                        <td>{  new Date(cla.reserveDate).toLocaleDateString()}</td>
                                        <td>{cla.class.classLocation}</td>
                                        <td>{new Date(cla.class.classDate).toLocaleDateString()}</td>
                                        <td>{cla.class.classTime}</td>
                                        <td>{cla.class.classLevel}</td>
                                        <td>{cla.class.instructorName}</td>
                                        <td> {(cla.class.Price === 0 || isNaN(cla.class.Price)) ? "Free" : `$ ${cla.class.Price}`}</td>
                                        <td>{cla.class.classDes}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>}
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