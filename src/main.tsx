import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import { Provider } from 'react-redux';
import store from './store/store';
import { StepsProvider } from './components/StepsProvider/StepsProvider.tsx';

import './styles.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <StepsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StepsProvider>
    </Provider>
  </React.StrictMode>
)
