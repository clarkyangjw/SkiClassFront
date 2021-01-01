import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

var style = {
    backgroundColor: "#181818",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color: "#DDDDCC"
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function Footer(props) {
    return (
        <div>
            <div style={phantom} />
            <div style={style} id = "footerContainer">

                <p>
                    Copy rights @SKI EXPERTS 2020
                </p>
                
                <div>
                <a href="https://www.youtube.com/"
                    id="youtubeSocial">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a href="https://www.facebook.com/"
                    id="facebookSocial">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.twitter.com/" className="twitterSocial">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/"
                    id="instagramSocial">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                </div>
                
            </div>
        </div>
    );
}

export default Footer;