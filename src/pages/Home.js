import React, {useEffect} from 'react';
import {getEvents, getEventsNum} from "../api/Eventapi";
const Home = () => {
    useEffect(() => {
        const result = getEvents({start: 1, end: 5});
        console.log(result, num);
    });
    return (
        <div>
            Home
        </div>
    );
};

export default Home;