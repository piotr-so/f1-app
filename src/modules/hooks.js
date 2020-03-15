
import { useEffect, useRef, useState, useCallback } from 'react';
import { useStateValue } from '../state/context';
import { setDriversData, setConstructorsData } from '../state/actions';
import axios from 'axios';

export const useIO = (options) => {
	const [elements, setElements] = useState([]);
	const [entries, setEntries] = useState([]);

	const observer = useRef(null);

	const { root, rootMargin, threshold } = options || {};

	useEffect(() => {
		if (elements.length > 0) {
			observer.current = new IntersectionObserver((ioEntries) => {
				setEntries(ioEntries);
			}, {
				threshold,
				root,
				rootMargin
			});
			elements.forEach(element => {
				observer.current.observe(element);
			});
		}
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		}
	}, [elements, root, rootMargin, threshold]);

	return [observer.current, setElements, entries];
};

export const useGetData = () => {
	const [requestedData, setRequestedData] = useState();
	const [, dispatch] = useStateValue();

	const fetchData = useCallback(
		async (dataTypeName) => {
			const dataTypesUrls = {
				'drivers-data': 'https://ergast.com/api/f1/2019/driverStandings.json',
				'constructors-data': 'https://ergast.com/api/f1/2019/constructorStandings.json'
			};
			let res = await axios.get(dataTypesUrls[dataTypeName]);

			if (dataTypeName === 'drivers-data') {
				const receivedData = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				dispatch(setDriversData(receivedData));
			}
			else if (dataTypeName === 'constructors-data') {
				const receivedData = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
				dispatch(setConstructorsData(receivedData))
			}
		},
		[dispatch]
	);

	useEffect(
		() => {
			if (requestedData !== undefined) fetchData(requestedData);
		},
		[fetchData, requestedData]
	);

	return [setRequestedData]
}