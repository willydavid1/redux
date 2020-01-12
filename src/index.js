import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

// importamos cosas de redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'; // importamos los reducers

// necesitamos crear un store, para pasarlo este almacenamiento a toda la app.
// primer parametro son todos lo reducers de mi app, el segundo parametro es el estado inicial
const store = createStore(
	reducers, // Son todos los reducers
	{}, // Estado inicial
	applyMiddleware(reduxThunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
