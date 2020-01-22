import React, { Component } from 'react';

// conectamos este componente a redux para acceder al reducer
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';


// destructuramos y renombramos el nombre del action creator
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
	async componentDidMount() {
		// Destructuramos cosas del this.props y el key por cada punto hay que destructurar mas adentro
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsuario,
			match: {
				params: { key }
			}
		} = this.props;

		// si no existen los usuarios (si no tiene mas de cero el arreglo) haz algo
		if (!this.props.usuariosReducer.usuarios.length) {
			await usuariosTraerTodos();
		}

		// si hay un error retorna nada 
		if (this.props.usuariosReducer.error) {
			return
		}

		// si este atributo publicaciones_key esta en el usuariosReducer.usuarios que me esta llegando (no ejecutes esto), Si no esta ese atributo en este usuario hay que ir a ponerla
		if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
			publicacionesTraerPorUsuario(key);
		}
	}

	ponerUsuario = () => {
		// destructuro el usuarios reducers
		const { 
			usuariosReducer, 
			match: { params: { key } } 
		} = this.props

		// si en el reducer de usuarios hay un error ejecuta el componente fatal
		if (usuariosReducer.error) {
			return <Fatal mensaje={ usuariosReducer.error } />
		}

		// si el usuarios reducer esta cargando o que usuariosReducer.usuarios.lenght no exista 
		if ( usuariosReducer.usuarios.length === 0 || usuariosReducer.cargando) {
			return <Spinner />
		}

		// del reducer de usuarios del usuario que estoy actualmente quiero el nombre
		const nombre = usuariosReducer.usuarios[key].name

		return (
		<h1> Publicaciones de {nombre} </h1>
		)

	};

	render() {
		console.log(this.props);
		return (
			<div>
				
				{this.props.match.params.key}

				{ this.ponerUsuario() }
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
	usuariosTraerTodos,
	publicacionesTraerPorUsuario
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
