import React, { useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {DataApi} from './API'

function Class(props) {
    const APIstring = DataApi;
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    //const [found, setFound] = useState(false1);
    let history = useHistory();
    useEffect(()=>{
        let token = localStorage.getItem('jwtToken');
        // alert(token);
        fetch(`${APIstring}/class/${props.id}`,{
            method: "GET",
            headers: {
                'Authorization' : token
            }
        })
        .then(res=>res.json())
        .then(result => {
            if(result){ // a "data" property exists on the returned data
                setCourse(result);
                //setFound(true); // we found some data
                setLoading(false); // no longer loading
            }else{
               // setFound(false); // we did not find any data
                setLoading(false); // no longer loading
            }
        });
    }, [props.id]);

    //alert(found);
    if(loading){
        return (
            <div>
               
               <h4>Please login! Thanks! </h4>
               
               <Link className="btn btn-primary" to="/login">Login</Link>
            </div>
        ); // could have a loading spinner, etc here
    }else{
        if(true){
            return (
                
                <div>
                    
                    <h2>{course.classLevel} {course.classType} Class holding at {course.classLocation} by {course.instructorName}</h2>
                    
                    <br />
                    <br />
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Date: </strong> {new Date(course.classDate).toLocaleDateString()}</li>
                        <li className="list-group-item"><strong>Time: </strong> {course.classTime}</li>
                        <li className="list-group-item"><strong>Class Location: </strong> {course.classLocation}</li>
                        <li className="list-group-item"><strong>Class capacity: </strong> {course.classCap}</li>
                        <li className="list-group-item"><strong>Available Site: </strong> {course.classCap - course.RegistedNumber}</li>
                        <li className="list-group-item"><strong>Instructor: </strong> {course.instructorName}</li>
                        <li className="list-group-item"><strong>Price: </strong> {(course.Price === 0 || isNaN(course.Price)) ? "Free" : course.Price}</li>
                        <li className="list-group-item"><strong>Class description: </strong> {course.classDes}</li>
                    </ul>
    
                    <h4><a style={{ cursor: "pointer"}} onClick={()=>{history.push(`/reserve/${course._id}`)}}>Click </a>to reserve this class or <a style={{ cursor: "pointer"}} onClick={()=>{history.push(`/classes`)}}>Back </a> to all class page</h4>
                    {/* <Link className="btn btn-primary" to="/reserve" params={{ id: "${props.id}" }} >Reserve this class</Link> */}

                    {/* <Link className="btn btn-primary" to="/classes">Back to all class</Link> */}
                </div>
            );
        }else{
            return <Redirect to={{ pathname: "/notFound"}} />
        }
    }
}

export default Class;