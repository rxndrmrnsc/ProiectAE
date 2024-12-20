import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import Login from './Login';
import { useState } from 'react';
import useCheckToken from './hooks/useCheckToken';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useCheckToken(setLoading, setIsLoggedIn);

  return (
    <div>
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
    </div>
  )
}

export default App