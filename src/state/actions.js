import actionTypes from './action-types';

export const setNextRaceEvent = nextRaceEventData => ({
    type: actionTypes.SET_NEXT_RACE_EVENT,
    payload: nextRaceEventData
});

export const setDriversData = driversData => ({
    type: actionTypes.SET_DRIVERS_DATA,
    payload: driversData
});

export const setConstructorsData = constructorsData => ({
    type: actionTypes.SET_CONSTRUCTORS_DATA,
    payload: constructorsData
});

export const setTopDriversData = topDriversData => ({
    type: actionTypes.SET_TOP_DRIVERS_DATA,
    payload: topDriversData
});

export const setTopConstructorsData = topConstructorsData => ({
    type: actionTypes.SET_TOP_CONSTRUCTORS_DATA,
    payload: topConstructorsData
});

export const setTopConstructorsVisible = () => ({
    type: actionTypes.SET_TOP_CONSTRUCTORS_VISIBLE
});

export const saveWindowPos = routeKeyWindowPos => ({
    type: actionTypes.SAVE_WINDOW_POS,
    payload: routeKeyWindowPos
});