import './App.css';
import SimpleMap from './components/SimpleMap';
import Weather from './components/Weather';
import Stations from './components/Stations';
import Trip from './components/Trip';

const App = () => (
  <div className="App">
    <SimpleMap />
    <div className="Sidebar">
      <Trip />
      <Stations />
    </div>
    <Weather />
  </div>
);

export default App;
