import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setClient } from './web/client/PortfolioClient';
import MockClient from './web/client/PortfolioMockClient';

setClient(MockClient);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

document.addEventListener('keydown', () => {
	document.body.classList.add('keyboard-user');
})
document.addEventListener('mousedown', () => {
	document.body.classList.remove('keyboard-user');
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
