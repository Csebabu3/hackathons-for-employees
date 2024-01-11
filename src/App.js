import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';

const App = () => {
  // Set employee IDs in local storage
  const setEmployeeIdsInLocalStorage = () => {
    const employeeIds = ['id1', 'id2', 'id3'];
    localStorage.setItem('employeeIds', JSON.stringify(employeeIds));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>

      <button onClick={setEmployeeIdsInLocalStorage}>Set Employee IDs in Local Storage</button>
    </div>
  );
};

export default App;
