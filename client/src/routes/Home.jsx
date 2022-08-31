import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemps, tempsFilter, createdFilter, nameOrder, weightOrder, clearDetails } from '../actions/index.js';
import Header from '../components/Header.jsx';
import NavBar from '../components/NavBar.jsx';
import HomeCard from '../components/HomeCards.jsx';
import NotFound from '../components/NotFound.jsx';
import Pages from '../components/Pages.jsx';
import Footer from "../components/Footer.jsx";
import style from '../styles/Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    const temps = useSelector((state) => state.temps);

    useEffect(() => dispatch(getDogs()), [dispatch]);
    useEffect(() => dispatch(getTemps()), [dispatch]);
    useEffect(() => dispatch(clearDetails()), [dispatch]);

    const [render, setRender] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(8);
    const lastCard = (currentPage * cardsPerPage);
    const firsCard = (lastCard - cardsPerPage);
    const dogCards = dogs.slice(firsCard, lastCard);

    function clickHandler(e) {
        setCurrentPage(e);
    }

    function clickPrevHandler() {
        setCurrentPage(currentPage - 1);
    }

    function clickNextHandler() {
        setCurrentPage(currentPage + 1);
    }

    function tempsFilterHandler(e) {
        e.preventDefault();
        dispatch(tempsFilter(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
        e.target.value = 'default';
    }

    function createdFilterHandler(e) {
        e.preventDefault();
        dispatch(createdFilter(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
        e.target.value = 'default';
    }

    function nameOrderHandler(e) {
        e.preventDefault();
        dispatch(nameOrder(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
        e.target.value = 'default';
    }

    function weightOrderHandler(e) {
        e.preventDefault();
        dispatch(weightOrder(e.target.value));
        setCurrentPage(1);
        setRender(e.target.value);
        e.target.value = 'default';
    }

    return (
        <div id='home' style={style}>

            <Header />

            <NavBar setCurrentPage={setCurrentPage} />

            <div id="filterBar" style={style}>
                <div id="sort">
                    <select onChange={(e) => nameOrderHandler(e)} defaultValue="default">
                        <option value='default' disabled='default' hidden>Order by name</option>
                        <option value="A-Z" key='A-Z' defaultValue>A-Z</option>
                        <option value="Z-A" key='Z-A'>Z-A</option>
                    </select>

                    <select onChange={(e) => weightOrderHandler(e)} defaultValue="default">
                        <option value='default' disabled='default' hidden>Order by weight</option>
                        <option value="ASC" key='ASC' defaultValue>ASC</option>
                        <option value="DESC" key='DESC'>DESC</option>
                    </select>
                </div>

                <div id="filters">
                    <select onChange={(e) => createdFilterHandler(e)} defaultValue="default">
                        <option value='default' disabled='default' hidden>All Dogs</option>
                        <option value="All" key='All' defaultValue>All Dogs</option>
                        <option value="Created" key='Created'>Created by Me</option>
                    </select>

                    <select onChange={(e) => tempsFilterHandler(e)}  >
                        <option value='default' disabled='default' hidden>All Temperaments</option>
                        <option value='All' defaultValue>All Temperaments</option>
                        {temps.map(t => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                </div>

            </div>

            <div id='cardsC'>
                
                {dogs.length >= 1 ? (
                    <div id="cards">
                        {dogCards.map((d) => {
                            return (
                                <HomeCard
                                    id={d.id}
                                    image={d.image}
                                    name={d.name}
                                    temperament={d.temperament}
                                    Temperaments={d.Temperaments}
                                    weight={d.weight}
                                    key={d.id}
                                />
                            )
                        })}
                    </div>

                ) : (<NotFound />)}
            
            </div>

            <div className={dogs.length < 1 ? 'hiddenDiv' : undefined}>
                <Pages
                    cardsPerPage={cardsPerPage}
                    dogs={dogs.length}
                    clickHandler={clickHandler}
                    currentPage={currentPage}
                    clickPrevHandler={clickPrevHandler}
                    clickNextHandler={clickNextHandler}
                />
            </div>

            <Footer />

        </div>
    )
};

