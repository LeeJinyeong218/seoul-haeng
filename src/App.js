import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Map from "./pages/Map";
import Book from "./pages/Book";
import './App.css';
import React, {useEffect, useState} from "react";
import {getAllEvents} from "./api/eventapi";
import LoadingModal from "./components/LoadingModal";

function App() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const date = new Date();

    const handleLoad = async () => {
        let result = [];
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getAllEvents();
        } catch (error) {
            console.error(error);
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        setEvents(result);
    };

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
      <div className="App">
          {isLoading ? LoadingModal: null}
          {loadingError?.message && <span>{loadingError.message}</span>}
          <Routes>
              <Route path="/" element={<Home events={events} date={date}/>} />
              <Route path="/map" element={<Map events={events} date={date}/>} />
              <Route path="/book" element={<Book events={events} date={date}/>} />
          </Routes>
      </div>
  );
}

export default App;
