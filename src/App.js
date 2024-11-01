import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import  Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';


function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase}  = useContext(FirebaseContext)
  const auth = getAuth()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User Object inside onAuthStateChanged callback:', user);
      setUser(user);
    });

    
    return () => unsubscribe();
  }, [auth, setUser]);
  return (
    <div>
      <Post>
      <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
