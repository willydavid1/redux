import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

// recibe por props los comentarios de la publicacion que se le dio click
const Comentarios = (props) => {

	
	if (props.com_error) {
		return <Fatal mensaje={ props.com_error } />
	}

	// si esta cargando y que no exista ningun comentario retorna el spinner
	if (props.com_cargando && props.comentarios.length === 0) {
		return <Spinner />
	}

	// si los comentarios vienen vacios, entonces no tiene comentarios esta publicacion
	if (props.comentarios.length === 0) {
		return <Fatal mensaje={" Este publicacion no tiene comentarios "} />
	}


	// retona un arreglo, itero los comentarios de la publicacion y por cada comentario retorna un li
	const ponerComentarios = () =>
		props.comentarios.map((comentario) => (
			<li key={comentario.id}>
				<b>
					<u> {comentario.email} </u>
				</b>
				<br />
				{comentario.body}
			</li>
		));

	return <ul>{ponerComentarios()}</ul>;
};

// Recibe todos los reducers y destructuramos todos los reducers por los que necesitamos
const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps)(Comentarios);
