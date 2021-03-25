import React, { Component } from 'react';
import axios from 'axios';

class Stations extends Component {
    state = {
        selection: { name: "unknow" },
        names: []
    };

    componentDidMount() {
        this.getNames();
    }

    handleSelect = (index) => {
        axios.get(`http://localhost:8080/api/getId?id=${index}`).then((req) => {
            if (req) {
                const selection = req.data;
                this.setState({ selection });
            }
        });
    };

    getNames = () => {
        axios.get(`http://localhost:8080/api/stationName`).then((req) => {
            if (req) {
                const names = req.data;
                this.handleSelect(names[0].id);
                this.setState({ names });
            }
        });
    }

    render() {
        return (
            <div className="Stations">
                <h2>Informations sur une Gare: </h2>
                <div className="Content">
                    <Selector names={this.state.names} select={this.handleSelect} />
                    <Informations station={this.state.selection} />
                </div>
            </div>
        );
    }
}

const Selector = ({ names, select }) => {
    const stations = names.map((el) => <option value={el.id}>{el.station_name}</option>);

    return (
        <div>
            <label htmlFor="stations-select"><strong>Gare: </strong></label>
            <select name="stations" id="stations-select" onChange={(e) => select(e.target.value)}>
                {stations}
            </select>
        </div>
    );
}

const Informations = ({ station }) => (
    <div>
        <p><strong>Nom:</strong> {station.givenName}</p>
        <p><strong>Région:</strong> {station.nomRegion} ({station.numeroRegion})</p>
        <p><strong>Département:</strong> {station.nomDepartement} ({station.numeroDepartement})</p>
    </div>
);

export default Stations;