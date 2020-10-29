import React from 'react';

function About(props) {
    return (
        <div>
            <h2>About Us</h2>
            <p>In this project, I am going to build a platform to connect the skiers and ski instructors. In this
            website, we will have a database to store all the user data and class data. Both skiers and ski
            instructors can create an account on the website. After they create the account, they can
            manage their account including setting their profile and change their account passwords. Ski
            instructors can post their classes through the website. But they must be validated before they
            post their available class. This website will display the most popular ski class created by the best
            rating ski instructor. Skier can register these classes according to the location, price, rating of the
            instructor, etc. </p>
            <h4>The back-end of the website is a RESTful API, the API loading data from MongoDB. Front interface written in React!</h4>
        </div>
    );
}

export default About;