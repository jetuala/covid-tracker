import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);
    // sets Chart state with dailyData variable and setDailyData function

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
            // bypass putting fetchDailyData into a variable, instead directly populates dailyData using setDailyData (set*** --> *** is a prebuilt feature of useState???)
        }

        fetchAPI();
    }, [])

    const lineChart = (
        // ternary operators, remember those? :P
        dailyData.length // doesn't need != 0 because dailyData.length by itself: 0 = false, anything else = true
        ? ( 
            <Line 
            data={{
                labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: '#3333ff',
                    backgroundColor: 'rgba(255, 0, 0, 0.5',
                    fill: true,
                }, {
                    data: dailyData.map((data) => data.recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    fill: true,
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar 
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                    }}
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
