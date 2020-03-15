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