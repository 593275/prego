import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import {Login} from './Login';
import {Dashboard} from './Dashboard';

function App() {
    return (
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    );
}

export default App;