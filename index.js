import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx'
// import store from './redux-store/StoreIndex.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </Provider>
);
