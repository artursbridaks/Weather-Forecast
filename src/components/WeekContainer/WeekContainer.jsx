import React, { useEffect, useState } from 'react';
import apiConfig from '../../constants/apiKeys';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import DayCard from '../Day/Card/Card';
import styles from './WeekContainer.module.css';

const groupTemperaturesByDate = (temperatures) => {
    let grouped = {};

    temperatures.forEach((temperature) => {
        var date = new Date(temperature.dt * 1000).toLocaleDateString();

        if (!grouped.hasOwnProperty(date)) {
            grouped[date] = [];
        }

        grouped[date].push(temperature);
    });

    return grouped;
};

const getLocation = (options) => (
    new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    })
);

const getWeatherData = (location) => {
    let weatherURL = `${apiConfig.base}/forecast?appid=${apiConfig.key}&units=metric`;
    if (location) {
        weatherURL += `&lat=${location.latitude}&lon=${location.longitude}`;
    } else {
        weatherURL += '&q=Riga';
    }

    return axios.get(weatherURL);
};

const WeekContainer = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let response;

            try {
                let location = await getLocation();
                response = await getWeatherData(location.coords);
            } catch (error) {
                response = await getWeatherData();
            }

            setWeatherData(response.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="WeekContainer">
            <div>
                <h4 className={styles.header}>WEATHER FORECAST</h4>
                <h5 className={styles.header}>Location detected: {weatherData.city.name}</h5>
                <Accordion defaultActiveKey="" className={styles.accordion}>
                    {Object.entries(groupTemperaturesByDate(weatherData.list)).map(([date, temperatures]) => (
                        <DayCard
                            key={date}
                            temperatures={temperatures}
                            index={date}
                        />
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default WeekContainer;