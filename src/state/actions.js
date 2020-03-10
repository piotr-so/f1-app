import actionTypes from './action-types';

export const addDriverStandings = driversData => ({
    type: actionTypes.ADD_DRIVER_STANDINGS,
    payload: driversData
});

export const setTopDriversData = topDriversData => ({
    type: actionTypes.SET_TOP_DRIVERS_DATA,
    payload: topDriversData
});

export const setNextRaceEvent = nextRaceEventData => ({
    type: actionTypes.SET_NEXT_RACE_EVENT,
    payload: nextRaceEventData
});

export const setTopContructorsData = topContructorsData => ({
    type: actionTypes.SET_TOP_CONSTRUCTORS,
    payload: topContructorsData
});
