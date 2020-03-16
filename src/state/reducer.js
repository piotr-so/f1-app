import actionTypes from './action-types';

export const initialState = {
    nextRaceEvent: null,
    drivers: [],
    topDriversData: {},
    constructors: [],
    topConstructorsData: {},
    topConstructorsVisible: false,
    windowPositions: {}
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_NEXT_RACE_EVENT:
            return {
                ...state,
                nextRaceEvent: action.payload,
            };
        case actionTypes.SET_DRIVERS_DATA:
            return {
                ...state,
                drivers: action.payload,
            };
        case actionTypes.SET_CONSTRUCTORS_DATA:
            return {
                ...state,
                constructors: action.payload,
            };
        case actionTypes.SET_TOP_DRIVERS_DATA:
            return {
                ...state,
                topDriversData: action.payload
            };
        case actionTypes.SET_TOP_CONSTRUCTORS_DATA:
            return {
                ...state,
                topConstructorsData: action.payload
            };
        case actionTypes.SET_TOP_CONSTRUCTORS_VISIBLE:
            return {
                ...state,
                topConstructorsVisible: true
            };
        case actionTypes.SAVE_WINDOW_POS:
            return {
                ...state,
                windowPositions: action.payload
            };
        default:
            return state;
    }
};