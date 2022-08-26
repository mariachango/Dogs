import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs, getDogQuery, getDog, addDog, getTemps, tempsFilter, createdFilter, nameOrder, weightOrder } from '../actions/index.js';
import Cards from '../components/HomeCards.jsx';
import NavBar from '../components/NavBar.jsx';
import Pages from '../components/Pages.jsx';
import style from '../styles/Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temps = useSelector((state) => state.temps);

    useEffect(() => dispatch(getDogs()), [dispatch]);
    useEffect(() => dispatch(getTemps()), [dispatch]);

    const [nameOrder, setNameOrder] = useState('');
    const [weightOrder, setWeightOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(8);
    const lastCard = (currentPage * cardsPerPage);
    const firsCard = (lastCard - cardsPerPage);
    const dogCards = dogs.slice(firsCard, lastCard);

    const page = (pageNo) => {
        setCurrentPage(pageNo);
    };

    function clickHandler(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getDogs())
    }

    function tempsFilterHandler(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(tempsFilter(e.target.value))
    }

    function createdFilterHandler(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(createdFilter(e.target.value))
    }

    function nameOrderHandler(e) {
        e.preventDefault();
        dispatch(nameOrder(e.target.value));
        setCurrentPage(1);
        setNameOrder(`${e.target.value}`);
    }

    function weightOrderHandler(e) {
        e.preventDefault();
        dispatch(weightOrder(e.target.value));
        setCurrentPage(1);
        setWeightOrder(`${e.target.value}`);
    }

    return (
        <div>
            <div>
                <h1>
                    <img src="https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2017/08/Personajes-Puppy-Dogs-Palls.png?resize=300%2C300" alt="Henry Dogs" />
                </h1>
            </div>

            <NavBar />
        </div>
    )
};

