import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { JobProvider } from './contenxt';
import reportWebVitals from './reportWebVitals';
import './style/custom.scss';

ReactDOM.render(
  <React.StrictMode>
    <JobProvider>
      <App />
    </JobProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
