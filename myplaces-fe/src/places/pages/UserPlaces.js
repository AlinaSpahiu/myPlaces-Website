import React from 'react';
import {useParams} from 'react-router-dom' //hook

import PlaceList from "../components/PlaceList"

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Gala Tower',
        description: 'The best Tower in Turkey!',
        imageUrl: 'https://www.emlakgundemi.com.tr/images/haberler/2020/06/galata_kulesi_muze_oluyor_h14811_d39d5.jpg',
        adress: "Bereketzade, Galata kulesi, 34421 Beyoğlu/İstanbul, Turkey",
        location: {
           lat: 41.0256718,
           lng: 28.97194
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Gala Tower',
        description: 'The best Tower in Turkey!',
        imageUrl: 'https://www.emlakgundemi.com.tr/images/haberler/2020/06/galata_kulesi_muze_oluyor_h14811_d39d5.jpg',
        adress: "Bereketzade, Galata kulesi, 34421 Beyoğlu/İstanbul, Turkey",
        location: {
           lat: 41.0256718,
           lng: 28.97194
        },
        creator: 'u1'
    },
    {
        id: 'p3',
        title: 'Gala Tower',
        description: 'The best Tower in Turkey!',
        imageUrl: 'https://www.emlakgundemi.com.tr/images/haberler/2020/06/galata_kulesi_muze_oluyor_h14811_d39d5.jpg',
        adress: "Bereketzade, Galata kulesi, 34421 Beyoğlu/İstanbul, Turkey",
        location: {
           lat: 41.0256718,
           lng: 28.97194
        },
        creator: 'u2'
    }
]
const UserPlaces = () =>{
   //useParams-hook, to get only the phosot of tha id of that user
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
     return(
        <PlaceList items={loadedPlaces} />
     )
}
export default UserPlaces