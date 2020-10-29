// import { FormControl } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



function ReserveClass(props) {
    const APIstring = "https://sheltered-stream-35085.herokuapp.com/api";
    const [currentClass, setCurrentClass] = useState({});
    const [prevClass, setPrevClass] = useState({});
    // const [addClassId, setAddClasssId] = useState({});
    // const [loading, setLoading] = useState(true);
    let history = useHistory();
    
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        let email = localStorage.getItem('email');
        // alert(token+email)
        fetch(`${APIstring}/class/${props.id}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setCurrentClass(result);

                }
            });
        fetch(`${APIstring}/userPro/${email}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setPrevClass(result.reservedClass);
                }
            });


    }, [props.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('jwtToken');
        let availableNum = 0;
        let registnum = 1;
        fetch(`${APIstring}/class/${props.id}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    // setCurrentClass(result);
                    availableNum = result.classCap - result.RegistedNumber;
                    registnum += result.RegistedNumber
                    
                    if (availableNum > 0) {
                        fetch(`${APIstring}/class/${props.id}`, {
                            method: "PUT",
                            headers: {
                                'Authorization': token,
                                "content-type": "application/json",
                                "accept": "application/json"
                            },
                            body: JSON.stringify({
                                "RegistedNumber": registnum
                            })
                        })
                            .then(res => res.json())
                            .then(result => {
                                if (result) {
                                    // setCurrentClass(result);
                                    console.log(JSON.stringify(result));
                                }
                            });
                    }
                    else {
                        alert("This class is not available now!!!!!")
                    }

                    let prev = [...prevClass];

                    let curr = {
                        class: currentClass,
                        reserveDate: Date(),
                        isCancel: false
                    };
                    prev.push(curr);

                    
                    // const upclass = {
                    //     reservedClass: JSON.stringify(prev)
                    // }
                    let email = localStorage.getItem('email');

                    fetch(`${APIstring}/userPro/${email}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            "reservedClass": prev
                        })

                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result) {
                                console.log(JSON.stringify(result));
                            }
                            history.push("/account")
                        });

                    
                }
            });




    }

    return (
        <div>

            <h2>Please check the class information!</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Date: </strong> {new Date(currentClass.classDate).toLocaleDateString()}</li>
                <li className="list-group-item"><strong>Time: </strong> {currentClass.classTime}</li>
                <li className="list-group-item"><strong>Class Location: </strong> {currentClass.classLocation}</li>
                <li className="list-group-item"><strong>Available Site: </strong> {currentClass.classCap - currentClass.RegistedNumber}</li>
                <li className="list-group-item"><strong>Instructor: </strong> {currentClass.instructorName}</li>
                <li className="list-group-item"><strong>Price: </strong> {(currentClass.Price === 0 || isNaN(currentClass.Price)) ? "Free" : currentClass.Price}</li>
                <li className="list-group-item"><strong>Class description: </strong> {currentClass.classDes}</li>
            </ul>

            {(currentClass.classCap - currentClass.RegistedNumber) > 0 ?
                <div>
                <button type="submit" onClick={handleSubmit}>Comfirm reserve</button>
                <h4>Please feel free to reserve a class. All classes are free right now!</h4>
                </div>
                 
                :
                <div>
                    <h4>This class is Full, Please check another class!!</h4>
                    <Link className="btn btn-primary" to="/classes">Find a class</Link>
                </div>
            }


        </div>
    );
}

export default ReserveClass;