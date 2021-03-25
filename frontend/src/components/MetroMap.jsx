import React, { Component } from 'react';

class MetroMap extends Component {
    render() {
        return (
            <div className="Stations">
                <h2>Informations sur une Gare: </h2>
                <Selector names={this.state.names} select={this.handleSelect} />
                <Informations station={this.state.selection} />
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

export default MetroMap;