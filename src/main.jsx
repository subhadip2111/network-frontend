import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter as Router } from 'react-router-dom'; // Changed from BrowserRouter
import { Provider } from 'react-redux';
import { persistor, store } from './store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
        <Toaster position="top-center" reverseOrder={false} />

  </Provider>
)