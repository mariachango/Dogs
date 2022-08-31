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
    WEIGHT_ORDER,
    CLEAR_DETAILS
} from './types.js';

export function getDogs() {
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        dispatch({ type: GET_DOGS, payload: dogs.data });
    };
};

export function getDogQuery(query) {
    return async function (dispatch) {
        try {
            const dog = await axios.get(`http://localhost:3001/dogs/?name=${query}`);
            dispatch({ type: GET_DOG_QUERY, payload: dog.data });
        } catch {
            dispatch({ type: GET_DOG_QUERY, payload: '' });
        }
    };
};

export function getDog(id) {
    return async function (dispatch) {
        var dog = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({ type: GET_DOG, payload: dog.data });
    };
};

export function addDog(payload) {
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

export function tempsFilter(payload) {
    return {
        type: TEMPS_FILTER, payload
    };
};

export function createdFilter(payload) {
    return {
        type: CREATED_FILTER, payload
    };
};

export function nameOrder(payload) {
    return {
        type: NAME_ORDER, payload
    };
};

export function weightOrder(payload) {
    return {
        type: WEIGHT_ORDER, payload
    };
};

export function clearDetails(payload) {
    return {
        type: CLEAR_DETAILS, payload
    };
};

