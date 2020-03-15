import actionTypes from './action-types';

export const initialState = {
    nextRaceEvent: null,
    drivers: [],
    constructors: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_NEXT_RACE_EVENT:
            return {
                ...state,
                nextRaceEvent: action.payload
            };
        case actionTypes.SET_DRIVERS_DATA:
            return {
                ...state,
                drivers: action.payload
            };
        case actionTypes.SET_CONSTRUCTORS_DATA:
            return {
                ...state,
                constructors: action.payload
            };
        default:
            return state;
    }
};