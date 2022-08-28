import React from "react";
import { Link } from 'react-router-dom';
import style from '../styles/HomeCards.css';

export default function HomeCard({ id, image, name, temperament, weight }) {
    
    if(!image) {image = "https://play-lh.googleusercontent.com/PtA3zl3BnaONpKTGkXggmsnVQecMd8vAv-qZC3-BA8m5hUZJPs26mV-oO7xrDFAuReQ";}
    
    return (

        <Link to={`/dogs/${id}`}>
            <div id='card' style={style}>

                <img id='img' src={image} alt='Img' />


                <h1>{name}</h1>

                <p>{weight}</p>
                <p>{temperament}</p>

            </div>
        </Link>
    )
};