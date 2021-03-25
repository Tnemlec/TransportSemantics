import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    state = {
        url: "http://cdn.weatherapi.com/weather/64x64/day/113.png",
        temp: 0,
        feel: 0,
    }

    componentDidMount() {
        this.fetchAPI();
    }

    fetchAPI = () => {
        axios.get(`http://localhost:8080/api/weather`).then((req) => {
            if (req) {
                const current = req.data.current;
                const url = `http:${current.condition.icon}`;
                const temp = current.temp_c;
                const feel = current.feelslike_c;

                this.setState({ url, temp, feel })
            }
        });
    }

    render() {
        return (
            <div className="Card">
                <img src={this.state.url} alt="weather"></img>
                <h2>Aujourd'hui à Paris</h2>
                <p>Température: {this.state.temp}°C</p>
                <p>Ressenti: {this.state.feel}°C</p>
            </div>);
    }
}

export default Weather;