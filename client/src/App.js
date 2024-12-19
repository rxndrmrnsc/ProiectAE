import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import { useState } from 'react';
import useCheckToken from './hooks/useCheckToken';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useCheckToken(setLoading, setIsLoggedIn);

  return (

    <NextUIProvider>
      <Router>
        <Routes>
          {loading ? <Route path='*' element={<div>Spinner</div>} />
          :
          <>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<div>Page not found</div>} />
          </>
          }
        </Routes>
      </Router>
    </NextUIProvider>

  );
}

export default App;
