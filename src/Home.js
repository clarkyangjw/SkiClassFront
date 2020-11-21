import React from 'react';
import {Carousel} from 'react-bootstrap'
// import Carousel from 'react-bootstrap/Carousel'  
function Home(props) {
    return (
        <div >
            <h1 style={{'text-align': 'center'}}>Welcome to SKI EXPERT</h1>
            <br/>
            <h4 style={{'text-align': 'center'}}>You can reserve a ski class via this website. This is a project website. No payment needed. No class will be held! Thanks!</h4>
            <br/>
            <h4 style={{'text-align': 'center'}}>Happy Skiing</h4>
            <br/>
            <br/>
           

           
            {/* <p>This is a project website. No payment needed. Thanks!</p> style={{'height':"540px", 'width':"720px", "margin-left": "auto", "margin-right": "auto"}} */}
            <div >
            <Carousel >
                <Carousel.Item >
                    <img
                        className="d-block w-100 h-50"
                        src={process.env.PUBLIC_URL +"/imag/11.jpg"}
                        alt="First slide"
                        // style={{'vertical-align':"middle"}}
                    />
                    <Carousel.Caption>
                        <h3>Mont-Tremblant</h3>
                        <p>Sunny ski day</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{'height':""}}>
                    <img
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL +"/imag/22.jpg"}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Mont-Tremblant</h3>
                        <p>Sunny ski day</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL +"/imag/33.jpg"}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Mont-Tremblant</h3>
                        <p>Sunny ski day</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item >
                    <img
                        className="d-block w-100"
                        src={process.env.PUBLIC_URL +"/imag/44.jpg"}
                        alt="Fourth slide"
                    />
                    <Carousel.Caption>
                        <h3>Mont-Tremblant</h3>
                        <p>Sunny ski day</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                
                
                
            </Carousel>
            </div>
            
        </div>
    );
}

export default Home;