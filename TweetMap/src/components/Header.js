import React from "react";
import Logo from "../ressources/twitterlogo.png";

export default function Header(){
    return (
        <div id="header">
            <img class="logo" src={Logo}/>
            <h3>Service de geolocalisation de Twitter</h3>
        </div>
    )
}