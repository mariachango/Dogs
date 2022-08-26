import React from "react";
import style from '../styles/NavBar.css';

export default function NavBar() {
    return (
        <div id="navbar">

            <div id="link">
                <a className="link" href="#home">Home</a>
                <a className="link" href="#add">Add</a>
            </div>


            <div id="searchbar" >
                <input type="text" placeholder="Search.." />
                <button type="summit">Search</button>
            </div>

        </div>
    )
};
