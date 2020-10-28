import React from 'react';

function About(props) {
    return (
        <div>
            <h2>About Us</h2>
            <p>In this project, we are going to build a platform to connect the skiers and ski instructors. In this
            website, we will have a database to store all the user data and class data. Both skiers and ski
            instructors can create an account on the website. After they create the account, they can
            manage their account including setting their profile and change their account passwords. Ski
            instructors can post their classes through the website. But they must be validated before they
            post their available class. This website will display the most popular ski class created by the best
            rating ski instructor. Skier can register these classes according to the location, price, rating of the
            instructor, etc. After the skier takes a class, both skier and ski instructors can write a review for
            each other. Our team will prepare all the documents that the project needed in the first phase
            of the project. Other functional APIs such as payment and hotel booking are not within the
            scope of this project phase</p>
        </div>
    );
}

export default About;