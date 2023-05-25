import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Map from "./pages/Map";
import Book from "./pages/Book";
import './App.css';
import {ItemsProvider} from "./contexts/ItemsContext";
import {LoadingProvider} from "./contexts/LoadingContext";
import {FilterProvider} from "./contexts/FilterContext";
import {PageProvider} from "./contexts/PageContext";
import {BindContextProvider} from "./contexts/BindContext";

function App() {
  return (
      <div className="App">
          <BindContextProvider>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/book" element={<Book />} />
              </Routes>
          </BindContextProvider>
      </div>
  );
}

export default App;
