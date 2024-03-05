import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
//  import { PersistGate } from 'redux-pe rsist/integration/react';
import {  store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

  
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate loading={null} > */}
        <App />
          {/* </PersistGate> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
