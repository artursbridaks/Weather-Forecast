import React from 'react';
import styles from './HourlyTemperature.module.css';

const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);

    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

const getTemperature = (temperature) => Math.round(temperature);

const DayHourlyTemperature = ({ temperature, timestamp }) => (
    <div className={styles.cardContent}>
        {getTemperature(temperature)}°C
        <br />
        {getTime(timestamp)}
    </div>
);

export default DayHourlyTemperature;