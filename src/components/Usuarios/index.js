import React, { Component } from 'react';
import axios from 'axios'; //importamos axios para hacer peticiones http
import { connect } from 'react-redux'; //importamos el conector para poder conectar el componente con el reducer o almacenamiento global

class Usuarios extends Component {

	// // cuando se monte el componente vamos a modificar el estado, por lo que hace un re render (vuelve a renderizar)
	// async componentDidMount() {
	// 	//hacemos una peticion de tipo get a la API y la respuesta es una promesa y para leerla usaremos async/await
	// 	const respuesta = await axios.get(
	// 		'https://jsonplaceholder.typicode.com/users'
	// 	); //retorna un promesa y cuando se resuelva esa promesa asignala a la variable

	// 	// console.log(respuesta.data);

	// 	this.setState({
	// 		usuarios: respuesta.data
	// 	});
	// }

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
export default connect(mapStateToProps, {/* Actions */})(Usuarios);
