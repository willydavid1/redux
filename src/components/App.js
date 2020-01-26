import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu'; //importamos el menu
import Usuarios from './Usuarios'; //importamos el componente usuarios que es una tabla
import Publicaciones from './Publicaciones';
import Tareas from "./Tareas"; // importo el componente tareas

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="margen">
			<Route exact path="/" component={Usuarios} />
			<Route exact path="/tareas" component={Tareas} />
			<Route exact path="/publicaciones/:key" component={Publicaciones} />
		</div>
	</BrowserRouter>
);

export default App;
