import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage"


const App = () => (
    <div className="container">
        <Route path="/" exact component={HomePage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/login" exact component={LoginPage} />
    </div>
);

export default App;
