import React from 'react';
import DayHourlyTemperature from '../HourlyTemperature/HourlyTemperature';
import { Accordion, Card } from 'react-bootstrap';
import styles from './Forecast.module.css';

const DayForecast = ({ index, temperatures }) => (
    <Accordion.Collapse eventKey={index}>
        <Card.Body className={styles.cardBody}>
            {temperatures.map((temperature, key) => (
                <DayHourlyTemperature
                    key={key}
                    temperature={temperature.main.temp}
                    timestamp={temperature.dt}
                />
            ))}
        </Card.Body>
    </Accordion.Collapse>
);

export default DayForecast;
