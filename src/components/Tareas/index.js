import React, { Component } from 'react';

//importo cosas de redux
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions'; // actions

// importamos los componentes:
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import { Link } from 'react-router-dom';

class Tareas extends Component {
	componentDidMount() {
		// solo si no hay tareas, las vamos a llamar
		if (!Object.keys(this.props.tareas).length) {
			this.props.traerTodas();
		}
	}

	mostrarContenido = () => {
		// destructuro los valores del tareasReducer
		const { tareas, cargando, error } = this.props;

		// manejamos si esta cargando retorna el spinner o si hay un error retorna el error
		if (cargando) {
			return <Spinner />;
		}

		if (error) {
			return <Fatal mensaje={error} />;
		}

		// Y si todo sale bien, retorno: Object.keys(tareas) nos devuelve las keys de las tareas (un arreglo de 1 hasta 10 lo que tiene el objeto, son los ids de los usuarios) y mapeo cada llave que por cada usu_id retorne un h2 con el usuario y un div con las tareas llama a ponerTareas() que itera todas las tareas del usuario
		return Object.keys(tareas).map((usu_id) => (
			<div key={usu_id}>
				<h2> Usuario {usu_id} </h2>
				<div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
			</div>
		));
	};

	// recibe el usu_id, el id del usuario, recordemos que iteramos por las tareas del usuario y por cada usuario retorno todas las tareas del usuario junto un checkbox.
	ponerTareas = (usu_id) => {
		// destructuro las tareas del estado
		const { tareas } = this.props;

		// const que sera igual al objeto de las tareas del usuario en especifico, tiene todas las tareas de un usuario
		const por_usuario = {
			...tareas[usu_id]
		};

		// saco las keys que son los id de las tareas y mapeo cada tarea del usuario en especifico| retorno un checkbox que por default el valor sera del jsonPlaceHolder y el titulo de la tarea
		return Object.keys(por_usuario).map((tar_id) => (
			<div key={tar_id}>
				<input type="checkbox" defaultChecked={por_usuario[tar_id].completed} />
				{por_usuario[tar_id].title}
			</div>
		));
	};

	render() {
		return (
			<div>
				<button>
					<Link to="/tareas/guardar">
						Agregar
					</Link>
				</button>
				{this.mostrarContenido()}
			</div>
		);
	}
}

// Recibe todos los reducers y destructuramos el reducers que usaremos
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, tareasActions)(Tareas);
