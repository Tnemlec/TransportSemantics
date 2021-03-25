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
        const coord = [marker.longitude, marker.latitude];
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
                    <div className="Card">
                        <p><strong>Nom:</strong> {marker.givenName}</p>
                        <p><strong>Région:</strong> {marker.nomRegion} ({marker.numeroRegion})</p>
                        <p><strong>Département:</strong> {marker.nomDepartement} ({marker.numeroDepartement})</p>
                    </div>
                    <img src={logo} alt="marker" />
                </Marker>
            </Map>
        );
    }
}

export default SimpleMap;