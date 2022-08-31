import React from "react";
import style from '../styles/NotFound.css';

export default function NotFound() {
    return (
        <div id="NotFound" style={style}>
                <div id="nfContainer">
                    <img id="nf" referrerPolicy="no-referrer" src="https://assets.stickpng.com/images/5ae967896554160a79be9f6a.png" alt="NotFound" />
                    <p>Sorry! Nothing has been found.</p>
                </div>
        </div>
    )
};