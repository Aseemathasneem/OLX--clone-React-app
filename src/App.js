import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import  Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase}  = useContext(FirebaseContext)
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      setUser(user);
    });

    
    return () => unsubscribe();
  }, [auth, setUser]);
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
