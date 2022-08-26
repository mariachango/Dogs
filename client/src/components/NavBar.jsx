import React from "react";
import style from '../styles/Home.css';

export default function Form() {
    return (
            <div id={style.topnav}>
                <a href="#home">Home</a>
                <a href="#add">Add</a>
                <input type="text" placeholder="Search.."/>
            </div>
    )
};
