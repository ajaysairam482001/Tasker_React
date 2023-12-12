import React, { useState } from 'react';
import Signup from './signup2/Signup'; //use the signup page in signup2 as primary
import Login from './login/Login';
import Todomain from './Todomain';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Task from './Task';

function App() {
  const[loginToken,setToken] = useState(()=>{
    return localStorage.getItem('token')?true:false;
})
  return (
    <>
      <BrowserRouter>
        {!loginToken && (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}

        {loginToken && (
          <Routes>
            <Route path="/todo" element={<Todomain />} />
            <Route path="/task" element={<Task />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
