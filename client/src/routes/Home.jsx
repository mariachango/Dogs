import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps, tempsFilter, createdFilter, nameOrder, weightOrder, deleteDetails } from '../actions/index.js';
import Header from '../components/Header.jsx';
import NavBar from '../components/NavBar.jsx';
import HomeCard from '../components/HomeCards.jsx';
import Pages from '../components/Pages.jsx';
import Footer from "../components/Footer.jsx";
import style from '../styles/Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temps = useSelector((state) => state.temps);

    useEffect(() => dispatch(getDogs()), [dispatch]);
    useEffect(() => dispatch(getTemps()), [dispatch]);
    useEffect(() => dispatch(deleteDetails()), [dispatch]);

    const [render, setRender] = useState('');

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
        dispatch(tempsFilter(e.target.value));
        setRender(e.target.value);
    }

    function createdFilterHandler(e) {
        e.preventDefault();
        dispatch(createdFilter(e.target.value));
        setRender(e.target.value);
    }

    function nameOrderHandler(e) {
        e.preventDefault();
        dispatch(nameOrder(e.target.value));
        setRender(e.target.value);
    }

    function weightOrderHandler(e) {
        e.preventDefault();
        dispatch(weightOrder(e.target.value));
        setRender(e.target.value);
    }

    return (
        <div id='home' style={style}>

            <Header />

            <NavBar />

            <div id="filterBar" style={style}>

                <select onChange={(e) => nameOrderHandler(e)} defaultValue="default">
                    <option value="A-Z" key='A-Z' defaultValue>A-Z</option>
                    <option value="Z-A" key='Z-A'>Z-A</option>
                </select>

                <select onChange={(e) => weightOrderHandler(e)} defaultValue="default">
                    <option value="ASC" key='ASC' defaultValue>ASC</option>
                    <option value="DESC" key='DESC'>DESC</option>
                </select>

                <select onChange={(e) => createdFilterHandler(e)} defaultValue="default">
                    <option value="All" key='All' defaultValue>All</option>
                    <option value="Created" key='Created'>Created</option>
                </select>

                <select onChange={e => tempsFilterHandler(e)}  >
                    <option value='All' defaultValue>All</option>
                    {temps.map(t => {
                        return (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        )
                    })}
                </select>

            </div>

            <div id="cards">
                {dogCards.map((d) => {
                    return (
                        <HomeCard
                            id={d.id}
                            image={d.image}
                            name={d.name}
                            temperament={d.temperament}
                            weight={d.weight}
                            key={d.id}
                        />
                    )
                })}
            </div>

            <Footer />

        </div>
    )
};

