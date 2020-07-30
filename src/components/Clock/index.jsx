import React, { useState, useEffect } from 'react';
import './style.css';
// import PropTypes from 'prop-types';

// Clock.PropTypes= {};
function formatDate(date){
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes= `0${date.getMinutes()}`.slice(-2);
    const seconds= `0${date.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {
    const [timeString, setTimeString]= useState('');
    useEffect(() =>{
    const cleanInterVal= setInterval(()=>{
        const now= new Date();
        const newTimeString= formatDate(now);
        setTimeString(newTimeString);
    }, 1000) ;
    return () => {
        cleanInterVal(cleanInterVal);
    }
}, []);
    return (
        <p>{timeString}</p>
    );
}

export default Clock;