import React, { Component } from 'react';
import axios from 'axios';

class MetroMap extends Component {
    state = {
        selection: { name: "unknow", ligne: [], longitude: 0, latitude: 0 },
        names: []
    };

    handleSelect = (name) => {
        axios.get(`http://localhost:8080/api/MetroTram/getAllByName?name=${name}`).then((req) => {
            if (req) {
                console.log(req.data);
                const selection = req.data;
                console.log(selection)
                this.setState({ selection });
                this.props.updateMarker(selection);
            }
        });
    };

    componentDidMount() {
        this.getNames();
    }

    getNames = () => {
        axios.get(`http://localhost:8080/api/MetroTram/getNames`).then((req) => {
            if (req) {
                const names = req.data;
                this.handleSelect(names[0]);
                this.setState({ names });
            }
        });
    }

    render() {
        return (
            <div className="MetroMap">
                <h2>Informations sur une Station: </h2>
                <Selector names={this.state.names} select={this.handleSelect} />
                <Informations station={this.state.selection} />
            </div>
        );
    }
}

const Selector = ({ names, select }) => {
    const stations = names.map((name) => <option value={name}>{name}</option>);

    return (
        <div>
            <label htmlFor="metro-select"><strong>Station: </strong></label>
            <select name="metros" id="metro-select" onChange={(e) => select(e.target.value)}>
                {stations}
            </select>
        </div>
    );
}

const Informations = ({ station }) => {
    const lines = station.ligne.map((n) => <li>{n}</li>);

    return (
        <div>
            <p><strong>Nom:</strong> {station.name}</p>
            <p><strong>Lignes:</strong></p>
            <div className="Liste">
                <ul>{lines}</ul>
            </div>
        </div>
    );
}


export default MetroMap;