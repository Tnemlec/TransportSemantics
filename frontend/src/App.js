import { useState } from 'react';
import './App.css';
import SimpleMap from './components/SimpleMap';
import Weather from './components/Weather';
import Stations from './components/Stations';

const App = () => {
  const [marker, setMarker] = useState({
    longitude: 2.317,
    latitude: 48.838,
    givenName: "Paris-Montparnasse",
    nomDepartement: "Paris",
    nomRegion: "Île-de-France",
    numeroDepartement: "75",
    numeroRegion: "11"
  })

  const handleSelection = (station) => {
    setMarker(station);
  };

  return (
    <div className="App">
      <SimpleMap marker={marker} />
      <div className="Sidebar">
        <Stations updateMarker={handleSelection} />
      </div>
      <Weather />
    </div>
  );
}

export default App;
