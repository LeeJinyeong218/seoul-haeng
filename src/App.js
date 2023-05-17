import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Map from "./pages/Map";
import Book from "./pages/Book";
import './App.css';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </div>
  );
}

export default App;
