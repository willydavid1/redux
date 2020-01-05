import React, { Component } from 'react';
import { render } from '@testing-library/react';

class App extends Component {
	constructor() {
		super();

		// Creamos en el estado un atributo llamado usuarios que tiene un array con dos objetos
		this.state = {
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
		};
	}

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
