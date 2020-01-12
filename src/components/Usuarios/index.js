import React, { Component } from 'react';
import { connect } from 'react-redux'; //importamos el conector para poder conectar el componente con el reducer o almacenamiento global

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {
	// cuando se monte el componente vamos a modificar el estado, por lo que hace un re render (vuelve a renderizar)
	componentDidMount() {
		this.props.traerTodos()
	}

	//un metodo que retorna una fila por cada usuario que hay en el estado
	ponerFilas = () =>
		this.props.usuarios.map((usuario) => (
			<tr key={usuario.id}>
				<td>{usuario.name}</td>
				<td>{usuario.email}</td>
				<td>{usuario.website}</td>
			</tr>
		));

	render() {
		return (
			<div>
				<table className="tabla">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Correo</th>
							<th>Enlace</th>
						</tr>
					</thead>

					<tbody>{this.ponerFilas()}</tbody>
				</table>
			</div>
		);
	}
}

// Recibe todos los reducers y le decimos que reducer queremos usar en este componente.
const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado.
export default connect(mapStateToProps, usuariosActions)(Usuarios);
