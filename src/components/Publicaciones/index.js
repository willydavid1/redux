import React, { Component } from 'react';

// conectamos este componente a redux para acceder al reducer
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import Comentarios from "./Comentarios" // importamos el componente

// destructuramos y renombramos el nombre del action creator
const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
	traerPorUsuario: publicacionesTraerPorUsuario, 
	abrirCerrar,
	traerComentarios
	} = publicacionesActions;

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

	// se va a poner en el render
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

	// se va a poner en el render
	ponerPublicaciones = () => {
		// destructuramos
		const {
			usuariosReducer,
			usuariosReducer: { usuarios },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } } 
		} = this.props;

		// si no hay usuarios, retorna nada, si hay un error retorna nada porque en ponerUsuario() ya lo estamos validando
		if (!usuarios.length) return;
		if (usuariosReducer.error) return;

		// si publicaciones esta cargando, retorno el spinner y si hay un error retorno el fatal mandandole el error y si las publicaciones aun no estan retorna nada y si el atributo publicaciones_key no esta en el reducer retorna nada.
		if (publicacionesReducer.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={publicacionesReducer.error} />
		}
		if (publicaciones.length === 0) return;
		if (!("publicaciones_key" in usuarios[key])) return;
	
		// y si todo esta bien ya tengo las publicaciones y de ese usuario destructuro publicaciones key (donde estan las publicaciones de este usuario) y retorno todas las publicaciones que estan en esa casilla del arreglo
		// mando por parametro de todas las publicaciones selecciono las publicaciones que le corresponden a este usuario
		const { publicaciones_key } = usuarios[key]
		return this.mostrarInfo( 
			publicaciones[publicaciones_key],
			publicaciones_key 
		);
	};

	// funcion que retorna todas las publicaciones del usuario en especifico (recibimos por parametro todas las publicaciones que le corresponden a este usuario y la casilla de donde estan las publicaciones de este usuario)
	mostrarInfo = ( publicaciones, pub_key ) => (
		publicaciones.map( (publicacion, com_key) => ( 
			<div 
				key={ publicacion.id }
				className="publicaciones-titulo"
				onClick={ 
					() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)
				}
			>
				<h2>{ publicacion.title }</h2>
				<h3>{publicacion.body}</h3>
				{
					// si el atributo abierto de la publicacion es true retorna el componente caso contrario es cerrado, le mandamos por props los comentarios
					(publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ""
				}
			</div>
		))
	);

	// Cada vez que hagan click llama a esta function y recibe por parametro la casilla de donde están las publicaciones de este usuario y a cual publicación en especifico fue a la que le di click (sacamos el índice de la publicación del map) y nos llegan los comentarios
	mostrarComentarios = (pub_key, com_key, comentarios) => {
		// llamamos al actions Creator que modifica el atributo abierto de la publicacion
		this.props.abrirCerrar(pub_key, com_key);

		//si comentarios esta vacio, llamamos a este actionsCreator Y este retona todas las publicaciones pero modifica el atributo comentarios de la publicación que se le dio CLICK
		if (comentarios.length === 0) {
			this.props.traerComentarios(pub_key, com_key);
		}
		

	}


	render() {
		console.log(this.props);
		return (
			<div>
				{ this.ponerUsuario() }
				{ this.ponerPublicaciones() }
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

// como estamos usando varias acciones le especificamos las acciones que usaremos en este componente
const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuario,
	abrirCerrar,
	traerComentarios
};

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
