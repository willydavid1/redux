import React, { Component } from 'react';

// conectamos este componente a redux para acceder al reducer
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

class Publicaciones extends Component {
	componentDidMount() {
		// si no existen los usuarios (si no tiene mas de cero el arreglo) haz algo
		if (!this.props.usuariosReducer.usuarios.length) {
			this.props.traerTodos();
		}
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Publicaciones de </h1>
				{this.props.match.params.key}
			</div>
		);
	}
}

// Recibe todos los reducers y destructuramos todos los reducers por los que necesitamos
const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return {
		usuariosReducer,
		publicacionesReducer
	};
};

// como estamos usando varias acciones le especificamos las acciones que usaremos
const mapDispatchToProps = {
	...usuariosActions,
	...publicacionesActions
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
