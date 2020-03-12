
import { useEffect, useRef, useState } from 'react';
import { useStateValue } from '../state/context';
import { setDriversData } from '../state/actions';
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
	const [state, dispatch] = useStateValue();

	useEffect(
		() => {
			if (requestedData === 'drivers-data') {
				const fetch = async () => {
					let res = await axios.get('https://ergast.com/api/f1/2019/driverStandings.json');
					const receivedDriversData = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
					dispatch(
						setDriversData(receivedDriversData)
					);
				}
				fetch();
			}
		},
		[requestedData, dispatch]
	);

	return [setRequestedData]
}