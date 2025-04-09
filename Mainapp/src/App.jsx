import React from 'react';
import './App.css';
import WikipediaSearch from './components/WikipediaSearch';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/Newspage';

function App() {
  return (
    // <div className="App">
    //   <WikipediaSearch />
    // </div>
    <div className=''>
      <Router>
        <Routes>
          <Route path="/search" element={<WikipediaSearch />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
