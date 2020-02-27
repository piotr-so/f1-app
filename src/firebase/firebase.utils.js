import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDq-LwfiQO44KCVkBBWSByfFTk5WmKlEf8",
    authDomain: "f1-app-ab273.firebaseapp.com",
    databaseURL: "https://f1-app-ab273.firebaseio.com",
    projectId: "f1-app-ab273",
    storageBucket: "f1-app-ab273.appspot.com",
    messagingSenderId: "675104325641",
    appId: "1:675104325641:web:34cdd90ad589fe4bf0b8d8"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

const convertCollectionSnapshotToUrlObj = (collection, driverNamesArray) => {
    const driversImgUrlsObj = collection.docs[0].data();

    // list containing all drivers from driverNamesArray[]
    const filteredImgUrls =
        Object.keys(driversImgUrlsObj)
            .filter(driverKey => driverNamesArray.includes(driverKey))
            .reduce((acc, key) => {
                acc[key] = driversImgUrlsObj[key]
                return acc
            }, {})
    return filteredImgUrls
}

export const fetchDriverImgsFromCollection = (driverNamesArray) => {
    const collectionRef = firestore.collection('driversCollection');

    const result = collectionRef
        .get()
        .then(snapshot => {
            return convertCollectionSnapshotToUrlObj(snapshot, driverNamesArray)
        })
    return result
}