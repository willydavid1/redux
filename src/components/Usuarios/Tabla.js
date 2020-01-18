import React from 'react';
import { Link } from 'react-router-dom';

// IMPORTAMOS EL CONECTOR DE REDUX PARA CONECTAR ESTE COMPONENTE AL STORE GLOBAL
import { connect } from 'react-redux';

// este componente solo muestra el error que lo recibe por props
const Tabla = (props) => {
	//un metodo que retorna una fila por cada usuario que hay en el estado
	const ponerFilas = () =>
		// el parametro key que recibe el map es el índice del ítem del arreglo
		props.usuarios.map((usuario, key) => (
			<tr key={usuario.id}>
				<td>{usuario.name}</td>
				<td>{usuario.email}</td>
				<td>{usuario.website}</td>
				<td>
					<Link to={`/publicaciones/${key}`}>
						<div className="eye-solid icon"></div>
					</Link>
				</td>
			</tr>
		));

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

				<tbody>{ponerFilas()}</tbody>
			</table>
		</div>
	);
};

// Recibe todos los reducers y le decimos que reducer queremos usar en este componente.
const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators no porque el componente usuarios ya las trae.
export default connect(mapStateToProps)(Tabla);
