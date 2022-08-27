import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogQuery } from '../actions/index.js';
import style from '../styles/NavBar.css';

export default function NavBar() {
    
    const dispatch = useDispatch();
    const [search , setSearch] = useState();
    
    function changeHandler(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        dispatch(getDogQuery(search));
        e.target.value='';
    }
    
    return (
        
        <div id="navbar" style={style}>

            <div id="link" >
                <a className="link" href="/dogs">Home</a>
                <a className="link" href="/add">Add</a>
            </div>


            <div id="searchbar" >
                <input type="text" placeholder="Search.." onChange={(e) => changeHandler(e)}/>
                <button type="submit" onClick={(e) => submitHandler(e)}>Search</button>
            </div>

        </div>
    )
};
