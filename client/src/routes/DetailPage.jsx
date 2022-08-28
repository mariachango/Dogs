import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDog } from '../actions/index.js';
import Header from '../components/Header.jsx';
import NavBar from '../components/NavBar.jsx';
import Footer from "../components/Footer.jsx";
import style from '../styles/DetailPage.css';

export default function DetailPage(props) {

    const dispatch = useDispatch();

    const id = props.match.params.id

    const dog = useSelector((state) => state.dog);

    useEffect(() => {
        dispatch(getDog(id));
    }, [dispatch, id]);

    if (dog.length > 0 && !dog[0].image) {
        dog[0].image = "https://play-lh.googleusercontent.com/PtA3zl3BnaONpKTGkXggmsnVQecMd8vAv-qZC3-BA8m5hUZJPs26mV-oO7xrDFAuReQ";
    }

    return (
        <div id="DetailPage" style={style}>

            <Header/>

            <NavBar />

            <div id="container">
                <div id="detailCard">
                    <div><img id="dp" src={dog.length > 0 ? dog[0].image : undefined} alt="Img" /></div>
                    <p>{dog.length > 0 && dog[0].name}</p>
                    <p>{dog.length > 0 && dog[0].weight}</p>
                    <p>{dog.length > 0 && dog[0].height}</p>
                    <p>{dog.length > 0 && dog[0].life_span}</p>
                    <p>{dog.length > 0 && dog[0].temperament}</p>
                </div>
            </div>

            <Footer/>

        </div>
    )
};