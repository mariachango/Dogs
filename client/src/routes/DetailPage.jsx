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

    return (
        <div id="DetailPage" style={style}>

            <Header/>

            <NavBar />

            <div id="container">
                <div id="detailCard">
                    <div><img id="dp" src={dog.length > 0 && dog[0].image} alt="Img" /></div>
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