import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu'; //importamos el menu
import Usuarios from './Usuarios'; //importamos el componente usuarios que es una tabla
import Publicaciones from './Publicaciones';
import Tareas from "./Tareas"; // importo el componente tareas
import TareasGuardar from "./Tareas/Guardar"; // importo el componente guardar que se renderiza cuando se haga match con la ruta del navegador

const App = () => (
	<BrowserRouter>
		<Menu />
		<div className="margen">
			<Route exact path="/" component={Usuarios} />
			<Route exact path="/tareas" component={Tareas} />
			<Route exact path="/publicaciones/:key" component={Publicaciones} />
			<Route exact path="/tareas/guardar" component={TareasGuardar} />
			<Route exact path="/tareas/guardar/:usu_id/:tar_id" component={TareasGuardar} />
		</div>
	</BrowserRouter>
);

export default App;
