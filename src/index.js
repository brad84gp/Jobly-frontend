import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import LoadingSpinner from './Extra/LoadingSpinner'

// Redux related imports

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './React-Redux/RootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
  }
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
    ) 

const persistor = persistStore(store)

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={LoadingSpinner} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>, 
document.getElementById('root'));
