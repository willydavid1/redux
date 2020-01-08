import React, { Component } from 'react';
import axios from 'axios'; //importamos axios para hacer peticiones http

import { render } from '@testing-library/react';

class App extends Component {
	constructor() {
		super();

		// inicializamos el estado con un atributo usuarios que es un array vacio
		this.state = {
			usuarios: []
		};
	}

	// cuando se monte el componente vamos a modificar el estado, por lo que hace un re render (vuelve a renderizar)
	async componentDidMount() {

		//hacemos una peticion de tipo get a la API y la respuesta es una promesa y para leerla usaremos async/await
		const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users") //retorna un promesa y cuando se resuelva esa promesa asignala a la variable
		console.log(respuesta)

		this.setState({
			usuarios: [
				{
					nombre: 'Willy',
					correo: 'willydavid1@hotmial.com',
					enlace: 'willydavid1.github.io'
				},
				{
					nombre: 'Platzi',
					correo: 'platzi@hotmial.com',
					enlace: 'platzi.com'
				}
			]
		});
	}

	//un metodo que retorna una fila por cada usuario que hay en el estado
	ponerFilas = () =>
		this.state.usuarios.map((usuario) => (
			<tr>
				<td>{usuario.nombre}</td>
				<td>{usuario.correo}</td>
				<td>{usuario.enlace}</td>
			</tr>
		));

	render() {
		return (
			<div className="margen">
				<table className="tabla">
					<thead>
						<th>Nombre</th>
						<th>Correo</th>
						<th>Enlace</th>
					</thead>

					<tbody>{this.ponerFilas()}</tbody>
				</table>
			</div>
		);
	}
}

export default App;
