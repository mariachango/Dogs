import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDog } from '../actions/index.js';
import Header from '../components/Header.jsx';
import NavBar from '../components/NavBar.jsx';
import Footer from "../components/Footer.jsx";
import style from '../styles/FormPage.css';

export default function FormPage() {

    return (
        <div id="FormPage" style={style}>

            <Header />

            <NavBar />

            <div id="Form">
                <form>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" />
                    
                    <label for="weight">Weight</label>
                    <input type="text" id="weight" name="weight" />

                    <label for="height">Height</label>
                    <input type="text" id="height" name="height" />
                    
                    <label for="life_span">Life Span</label>
                    <input type="text" id="life_span" name="life_span" />

                    <input type="checkbox" />

                    <button>Submit</button>
                </form>
            </div>

            <Footer />

        </div>
    )
};