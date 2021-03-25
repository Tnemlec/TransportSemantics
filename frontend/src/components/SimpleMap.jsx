import { Component } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import logo from '../marker.png';

class SimpleMap extends Component {
    render() {
        const Map = ReactMapboxGl({
            accessToken:
                'pk.eyJ1IjoiYXVyc2VuIiwiYSI6ImNrbXAzMHBjZjB4bzUydnBlMnB1dXQ2N2IifQ.bJriM7H_lhQ6FTBpTBXRKA'
        });
        const marker = this.props.marker;
        const coord = marker.givenName ? [marker.longitude, marker.latitude]: [marker.latitude, marker.longitude];
        //const pins = this.props.marker.map((el) => <Marker coordinates={el}><img src={logo} /></Marker>);

        return (
            <Map
                // eslint-disable-next-line
                style="mapbox://styles/mapbox/streets-v10"
                className="Map"
                center={coord}
                zoom={[13]}
            >
                <Marker coordinates={coord}>
                    {marker.givenName ? <TrainContent train={marker} /> : <TramContent tram={marker} />}
                    <img src={logo} alt="marker" />
                </Marker>
            </Map>
        );
    }
}

const TrainContent = ({ train }) => (
    <div className="Card">
        <p><strong>Nom:</strong> {train.givenName}</p>
        <p><strong>Région:</strong> {train.nomRegion} ({train.numeroRegion})</p>
        <p><strong>Département:</strong> {train.nomDepartement} ({train.numeroDepartement})</p>
    </div>
);

const TramContent = ({tram}) => {
    const lines = tram.ligne.map((n) => <li>{n}</li>);

    return (
        <div className="Card">
            <p><strong>Nom:</strong> {tram.name}</p>
            <p><strong>Lignes:</strong></p>
            <div className="Liste">
                <ul>{lines}</ul>
            </div>
        </div>
    );
}

export default SimpleMap;