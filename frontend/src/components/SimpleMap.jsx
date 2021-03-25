import { Component } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import logo from '../marker.png';

class SimpleMap extends Component {
    render() {
        const Map = ReactMapboxGl({
            accessToken:
                'pk.eyJ1IjoiYXVyc2VuIiwiYSI6ImNrbXAzMHBjZjB4bzUydnBlMnB1dXQ2N2IifQ.bJriM7H_lhQ6FTBpTBXRKA'
        });

        return (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                className="Map"
                center={[2.34, 48.85]}
                zoom={[12]}
            >
                <Marker coordinates={[2.34, 48.85]}>
                    <img src={logo} />
                </Marker>
            </Map>
        );
    }
}

export default SimpleMap;