import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const indexRoot = document.getElementById('root')




ReactDOM.render(<App />, indexRoot);
registerServiceWorker();
