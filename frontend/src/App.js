import { useState } from 'react';
import './App.css';
import SimpleMap from './components/SimpleMap';
import Weather from './components/Weather';
import Stations from './components/Stations';
import MetroMap from './components/MetroMap';

const App = () => {
  const [marker, setMarker] = useState({
    longitude: 2.317,
    latitude: 48.838,
  })

  const handleSelection = (station) => {
    setMarker(station);
  };

  return (
    <div className="App">
      <SimpleMap marker={marker} />
      <div className="Sidebar">
        <Stations updateMarker={handleSelection} />
        <MetroMap updateMarker={handleSelection}/>
      </div>
      <Weather />
    </div>
  );
}

export default App;
