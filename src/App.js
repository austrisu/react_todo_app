import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage"


const App = () => (
    <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/user" exact component={UserPage} />
    </div>
);

export default App;
