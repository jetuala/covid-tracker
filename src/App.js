import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

import { fetchData } from './api';

import coronaImage from './images/header.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }
    // sets State without Constructor nonsense

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }
    // async BEFORE hook is special
    // sets data in state to fetchedData from fetchedData function (duh)

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country })
        // this is called when value of CountryPicker is changed, sets country in state, which cascades to everything else!
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img classname={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;