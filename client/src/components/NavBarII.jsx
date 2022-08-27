import React from "react";
import style from '../styles/NavBar.css';

export default function NavBar() {
    
    return (
        
        <div id="navbar" style={style}>

            <div id="link" >
                <a className="link" href="/dogs">Home</a>
                <a className="link" href="/add">Add</a>
            </div>

        </div>
    )
};