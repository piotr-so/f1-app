import actionTypes from './action-types';

export const initialState = {
    drivers: [],
    topDrivers: [],
    topConstructors: [],
    nextRaceEvent: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_DRIVER_STANDINGS:
            return {
                ...state,
                drivers: action.payload
            };
        case actionTypes.SET_TOP_CONSTRUCTORS:
            return {
                ...state,
                topConstructors: action.payload
            };
        case actionTypes.SET_TOP_DRIVERS_DATA:
            return {
                ...state,
                topDrivers: action.payload
            };
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
        default:
            return state;
    }
};