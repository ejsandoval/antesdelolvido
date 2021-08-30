import React, { Component } from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js';
import './base.css';

const rootElement = document.getElementById('root');
const app = (
	<Router basename={process.env.REACT_APP_BASENAME}>
		<App />
	</Router>
);

if (rootElement.hasChildNodes()) {
	hydrate(app, rootElement);
} else {
	render(app, rootElement);
}
