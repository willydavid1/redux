import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

// importamos cosas de redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// necesitamos crear un store, para pasarlo este almacenamiento a toda la app.
// primer parametro son todos lo reducers de mi app, el segundo parametro es el estado inicial
const store = createStore(
	{}, // Son todos los reducers
	{} // Estado inicial
);

ReactDOM.render(<App />, document.getElementById('root'));
