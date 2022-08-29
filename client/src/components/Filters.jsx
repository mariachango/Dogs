import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemps, tempsFilter, createdFilter, nameOrder, weightOrder } from '../actions/index.js';
import style from '../styles/Filtering.css';

export default function Filters() {

    const dispatch = useDispatch();
    const temps = useSelector((state) => state.temps);

    useEffect(() => dispatch(getTemps()), [dispatch]);


    function tempsFilterHandler(e) {
        e.preventDefault();
        dispatch(tempsFilter(e.target.value));
    }

    function createdFilterHandler(e) {
        e.preventDefault();
        dispatch(createdFilter(e.target.value));
    }

    function nameOrderHandler(e) {
        e.preventDefault();
        dispatch(nameOrder(e.target.value));
    }

    function weightOrderHandler(e) {
        e.preventDefault();
        dispatch(weightOrder(e.target.value));
    }

    return (
        <div>
            <div className="sorts">
                <select onChange={(e) => nameOrderHandler(e)} defaultValue="default">
                    <option value="A-Z" key='A-Z' defaultValue>A-Z</option>
                    <option value="Z-A" key='Z-A'>Z-A</option>
                </select>
            
                <select className="filter" onChange={(e) => weightOrderHandler(e)} defaultValue="default">
                    <option value="ASC" key='ASC' defaultValue>ASC</option>
                    <option value="DESC" key='DESC'>DESC</option>
                </select>
            </div>
            
            <div className="filters">
                <select className="filter" onChange={(e) => createdFilterHandler(e)} defaultValue="default">
                    <option value="All" key='All' defaultValue>All</option>
                    <option value="Created" key='Created'>Created</option>
                </select>
           
                <select className="filter" onChange={e => tempsFilterHandler(e)}  >
                    <option value='All' defaultValue>All</option>
                    {temps.map(t => {
                        return (
                            <option value={t.name} key={t.id}>{t.name}</option>
                        )
                    })}
                </select>
            </div>

        </div>
    )
};