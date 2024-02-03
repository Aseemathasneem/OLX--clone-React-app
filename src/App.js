import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import  Signup from './Pages/Signup'

function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
