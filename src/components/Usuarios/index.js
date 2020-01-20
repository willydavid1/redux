import React, { Component } from 'react';
import { connect } from 'react-redux'; //importamos el conector para poder conectar el componente con el reducer o almacenamiento global

import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../General/Spinner'; //importamos el componente que muestra la animacion
import Fatal from '../General/Fatal'; //importamos el componente que muestra el error
import Tabla from './Tabla'; //importamos el componente tabla

class Usuarios extends Component {
	// cuando se monte el componente vamos a modificar el estado, por lo que hace un re render (vuelve a renderizar)
	componentDidMount() {
		// si no hay ningun usuarios traelos y si existen no hagas nada
		if (!this.props.usuarios.length) {
			this.props.traerTodos();
		}
	}

	ponerContenido = () => {
		// si esta cargando la peticion HTTP muestra un loader mientras
		if (this.props.cargando) {
			return <Spinner />;
		}

		// si hay algun error en el estado del reducer retorna el componente fatal
		if (this.props.error) {
			return <Fatal mensaje={this.props.error} />;
		}

		// si los datos estan vacios
		if (this.props.usuarios.length === 0) {
			return (
				<div>
					<h3>No encontramos ningún Usuario</h3>
				</div>
			);
		}

		return <Tabla />;
	};

	render() {
		console.log(this.props)
		return (
			<div>
				<h1>Usuarios</h1>
				{this.ponerContenido()}
			</div>
		);
	}
}

// Recibe todos los reducers y le decimos que reducer queremos usar en este componente.
const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators.
export default connect(mapStateToProps, usuariosActions)(Usuarios);
