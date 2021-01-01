import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CheckInstructor from '../instructor/CheckInstructor';
import Modal from 'react-modal';
import { DataApi } from '../API'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '40%'
    }
};

function Class(props) {
    const APIstring = DataApi;
    
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    let history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        // alert(token);
        fetch(`${APIstring}/class/${props.id}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setCourse(result);
                    setLoading(false); // no longer loading
                } else {
                    setLoading(false); // no longer loading
                }
            });
    }, [props.id]);

    //alert(found);
    if (loading) {
        return (
            <div>

                <h4>Please login! Thanks! </h4>

                <Link className="btn btn-primary" to="/login">Login</Link>
            </div>
        ); // could have a loading spinner, etc here
    } else {
        if (true) {
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
                        <li className="list-group-item"><strong>Instructor: </strong>  <strong><a style={{ cursor: "pointer" }} onClick={openModal}>{course.instructorName} </a></strong></li>
                        {/* <li className="list-group-item"><strong>Instructor: </strong>  <strong><a style={{ cursor: "pointer" }} onClick={() => { history.push(`/checkInstructor/${course.instructorEmail}`) }}>{course.instructorName} </a></strong></li> */}
                        {(course.Price === 0 || isNaN(course.Price)) ?
                            <li className="list-group-item"><strong>Price: Free</strong>   </li>
                            : <li className="list-group-item"><strong>Price: $</strong>  {course.Price} <strong> CAD</strong></li>}
                        {/* <li className="list-group-item"><strong>Price: </strong> {(course.Price === 0 || isNaN(course.Price)) ? "Free" : course.Price}</li> */}
                        <li className="list-group-item"><strong>Class description: </strong> {course.classDes}</li>
                    </ul>
                    {
                        (new Date(course.classDate)).getTime() < currentDate.getTime() ? <h4><span style={{ color: "red" }}>This class is expired! </span> <a style={{ cursor: "pointer" }} onClick={() => { history.push(`/classes`) }}> Back </a> to all class page</h4> :

                            <h4><a style={{ cursor: "pointer" }} onClick={() => { history.push(`/reserve/${course._id}`) }}>Click </a>to reserve this class or <a style={{ cursor: "pointer" }} onClick={() => { history.push(`/classes`) }}>Back </a> to all class page</h4>
                    }
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        
                    >
                        <CheckInstructor id={course.instructorEmail} />
                        <button onClick={closeModal}>close</button>
                    </Modal>

                </div>

            );
        } else {
            return <Redirect to={{ pathname: "/notFound" }} />
        }
    }
}

export default Class;