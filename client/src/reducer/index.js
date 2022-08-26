
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
} from '../actions/types.js';

const inicialState = {
    allDogs: [],
    dogs: [],
    dog: [],
    temps: [],
};

export default function reducer(state = inicialState, action) {
    switch (action.type) {

        case GET_DOGS:
            return { ...state, dogs: action.payload, allDogs: action.payload };

        case GET_DOG_QUERY:
            return { ...state, dogs: action.payload };

        case GET_DOG:
            return { ...state, dog: action.payload };

        case ADD_DOG:
            return { ...state };

        case GET_TEMPS:
            return { ...state, temps: action.payload };

        case TEMPS_FILTER:
            const filteredByT = state.allDogs.filter(d => d.temperament.includes(action.payload));
            return { ...state, dogs: filteredByT };

        case CREATED_FILTER:
            const filteredByC = state.allDogs.filter(d => d.createdByMe);
            return { ...state, dogs: filteredByC };

        case NAME_ORDER:
            let nameOrder;
            if (action.payload === 'A-Z') {
                nameOrder = state.dogs.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                })
            } else if (action.payload === 'Z-A') {
                nameOrder = state.dogs.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                })
            }
            return { ...state, dogs: nameOrder };

        case WEIGHT_ORDER:
            let weightOrder;
            if (action.payload === 'ASC') {
                weightOrder = state.dogs.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
            } else if (action.payload === 'DESC') {
                weightOrder = state.dogs.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
            }
            return { ...state, dogs: weightOrder };


        default: return state;
    }
}

