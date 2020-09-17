import React, { useState } from 'react';
import DayForecast from '../Forecast/Forecast';
import { Accordion, Card } from 'react-bootstrap';
import styles from './Card.module.css';

function findMaxTemperature(temperatures) {
    const maxTemperature = Math.max(...temperatures.map((temperature) => (temperature.main.temp_max)));

    return Math.round(maxTemperature);
};

function findMinTemperature(temperatures) {
    const minTemperature = Math.min(...temperatures.map((temperature) => (temperature.main.temp_min)));

    return Math.round(minTemperature);
};

function findAverageHumidity(temperatures) {
    const humidities = temperatures.map((temperature) => (temperature.main.humidity))
    let sum = 0;
    humidities.forEach((humidity) => {
        sum += humidity;
    });

    return Math.round(sum / humidities.length);
};

function getDayName(temperatures) {
    return new Date(temperatures[0].dt * 1000).toLocaleDateString('en-us', { weekday: 'long' });
};

const DayCard = ({ index, temperatures }) => {
    const [isOpen, setOpened] = useState(false);

    function onClick() {
        setOpened(isOpen ? false : true);
    }

    let className = styles.arrow;
    if (isOpen) {
        className += ' ' + styles.up;
    }

    return (
        <Card className={styles.cardContainer}>
            <Accordion.Toggle className={styles.card} onClick={onClick} as={Card.Header} eventKey={index}>
                <div className={styles.cardContent}>
                    <div className={styles.firstBox}>
                        <span className={styles.date}>
                            {getDayName(temperatures)}
                        </span>
                    </div>
                    <div className={styles.secondBox}>
                        <span className={styles.temperature}>
                            <strong>
                                {findMaxTemperature(temperatures)} °C
                            </strong>
                            <span className={styles.temperatureLow}>
                                {' / '} {findMinTemperature(temperatures)} °C
                            </span>
                        </span>
                        <br />
                        <span>
                            Avg. Humidity: {findAverageHumidity(temperatures)}%
                        </span>
                    </div>
                    <div className={styles.thirdBox}>
                        <div className={className}></div>
                    </div>
                </div>
            </Accordion.Toggle>
            <DayForecast
                index={index}
                temperatures={temperatures}
            />
        </Card>
    );
};

export default DayCard;