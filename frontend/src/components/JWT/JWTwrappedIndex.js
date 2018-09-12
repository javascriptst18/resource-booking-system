import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Login from './components/Login';
import logo from "./logo.svg";

ReactDOM.render(
    <Router>
        <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Resursbokning</h2>
        </div>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
