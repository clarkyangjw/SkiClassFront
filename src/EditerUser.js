import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './tool/FormikControl';
import { useHistory } from 'react-router-dom';

function EditerUser(props) {
    const [profile, setProfile] = useState({});
    let history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        //let email = localStorage.getItem('email');
        fetch(`https://quiet-earth-26628.herokuapp.com/api/userPro/${props.id}`, {
            method: "GET",
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result) { // a "data" property exists on the returned data
                    setProfile(result);
                    
                    // setLoading(false); // no longer loading
                } else {
                    // setFound(false); // we did not find any data
                    // setLoading(false); // no longer loading
                }
            });
    }, [props.id]);

    const sportDropdownOptions = [
        {key: 'Select your level', value:''},
        {key: 'Ski', value: 'Ski'},
        {key: 'Snowboard', value: 'Snowboard'},
        {key: 'Ski & Sowboard', value: 'Ski & Sowboard'}
    ]

    const leveLDropdownOptions =[
        {key: 'Select your level', value: ''},
        {key: 'Beginner', value: 'Beginner'},
        {key: 'Intermediate', value: 'Intermediate'},
        {key: 'Advanced', value: 'Advanced'},
        {key: 'Expert', value: 'Expert'}
    ]

    const locationCheckboxOption =[
        {key: 'Blue Mountain', value: 'Blue Mountain'},
        {key: 'Mount St. Louis', value: 'Mount St. Louis Moonstone'},
        {key: 'Earl Bales', value: 'Earl Bales Ski & Snowboard'},
        {key: 'Snow Valley', value: 'Snow Valley'},
        {key: 'Glen Eden', value: 'Glen Eden'},
        {key: 'Lakeridge', value: 'Ski lakeridge'},
        {key: 'Skyloft', value: 'Skyloft'},
        {key: 'Dagmar', value: 'Dagmar Ski Resort'}
        
    ]

    const tagsCheckboxOption =[
        {key: 'snow', value: 'snow'},
        {key: 'winter', value: 'winter'},
        {key: 'skiing', value: 'skiing'},
        {key: 'snowboarding', value: 'snowboarding'},
        {key: 'mountain', value: 'mountain'},
        {key: 'powder', value: 'powder'},
        {key: 'ice', value: 'ice'}
    ]
    

    const initialValues={
        name: '',
        skiSnowboard: '',
        skiLevel:'',
        favoriteLocation: [],
        Taget:[]
    }
    const validationSchema = Yup.object({
        // name: Yup.string().required('Required'),
        skiSnowboard: Yup.string().required('Required'),
        skiLevel: Yup.string().required('Required')
        
    })


    const onSubmit = value =>{
         
        if (value.name.trim() == ""){
            value.name = profile.name;
        }
        console.log(value);
        fetch(`https://quiet-earth-26628.herokuapp.com/api/userPro/${props.id}`, {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            
                            "name": value.name,
                            "skiSnowboard": value.skiSnowboard,
                            "skiLevel": value.skiLevel,
                            "favoriteLocation": value.favoriteLocation,
                            "Taget": value.Taget
                            
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

    return (
        <div>
            <h3 >Hi <span style={{color: "BlueViolet",fontFamily: "Menlo"}}>{profile.name}</span>!</h3>
            

            
            <p>Editting my profile</p>
            <Formik initialValues = {initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik=>{
                        return(
                            <Form>
                                {/* <input control='text'  label='name' name='name' placeholder = {profile.name}></input> */}
                                <FormikControl control='input'  label='Name' name='name' placeholder={profile.name}/><br/>
                                <FormikControl control='select'  label='Sport' name='skiSnowboard' options = {sportDropdownOptions}/><br/>
                                <FormikControl control='select'  label='Level' name='skiLevel' options = {leveLDropdownOptions}/><br/>
                                
                                <FormikControl control='checkbox'  label='My Location:' name='favoriteLocation' options = {locationCheckboxOption}/><br/><br/>
                                
                                <FormikControl control='checkbox'  label='My Tag: ' name='Taget' options = {tagsCheckboxOption}/><br/><br/>
                                <button type="submit" >Save my profile</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default EditerUser;