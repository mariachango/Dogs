import axios from 'axios';
import {
    GET_DOGS,
    GET_DOG_QUERY,
    GET_DOG,
    ADD_DOG,
    GET_TEMPS,
    TEMPS_FILTER,
    CREATED_FILTER,
    NAME_ORDER,
    WEIGHT_ORDER
} from './types.js';

export function getDogs(name) {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({ type: GET_DOGS, payload: dogs.data });
    };
};

export function getDogQuery(query) {
    return async function (dispatch) {
        const dog = await axios.get(`http://localhost:3001/dogs/?name=${query}`);
            dispatch({ type: GET_DOG_QUERY, payload: dog.data });
    };
};

export function getDog(id) {
    return async function (dispatch) {
        const dog = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({ type: GET_DOG, payload: dog.data });
    };
};

export function addDog() {
    return async function (dispatch) {
        const dog = await axios.post('http://localhost:3001/dogs', payload);
        dispatch({ type: ADD_DOG, payload: dog.data })
    };
};

export function getTemps() {
    return async function (dispatch) {
        const temps = await axios.get('http://localhost:3001/temperaments');
        dispatch({ type: GET_TEMPS, payload: temps.data });
    };
};

export function tempsFilter() {
    return {
        type: TEMPS_FILTER , payload 
    };
};

export function createdFilter() {
    return {
        type: CREATED_FILTER , payload 
    };
};

export function nameOrder() {
    return {
        type: NAME_ORDER , payload 
    };
};

export function weightOrder() {
    return {
        type: WEIGHT_ORDER , payload 
    };
};
