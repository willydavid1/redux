import axios from 'axios'; //importamos axios para hacer peticiones http
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes'; // IMPORTAMOS SOLAMENTE la constante TRAER_TODOS de esta ruta ../types/usuariosTypes

//esta funcion traerTodos retorna otra función, dispatch (envio) es el que va a disparar esa llamada y va a contactar al reducer para que haga el cambio de estado
export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		//hacemos una peticion de tipo get a la API y la respuesta es una promesa y para leerla usaremos async/await
		const respuesta = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		); //retorna un promesa y cuando se resuelva esa promesa asignala a la variable

		// Creo mi objeto vacio de tareas, por todo lo que me esta repondiendo la api que es un arreglo, por cada tarea voy a iterar, El objeto vacio de tareas le voy a agregar un atributo-objeto que es el tar.userId el id de cada usuario(tar vale a cada tarea) y a ese objeto despliega todo lo que tenga las tareas en ese id y le pasamos un nuevo atributo a ese objeto que es el id de la tarea y le pasamos todo el objeto.
		// el segundo objeto a iterar de la api, a tareas al objeto con el id del usuario 1: a ese objeto le despligo todo lo que ya tenia, tenia el objeto 1 que era la tarea anterior con id 1 y aparte a ese objeto le voy agregar la propiedad 2, va a tener la propiedad 1 y le añado la propiedad dos
		// acomoda en un objeto con id del usuario, las tareas que le corresponden a este usuario
		const tareas = {}
		respuesta.data.map( (tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		});
	} catch (error) {
		console.log('error:' + error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.'
		});
	}
};

// esta accion va a cambiar usuarioId mandando un dispatch que modifica ese atributo del reducer, recibe por parametro lo que se escribio en el input
export const cambioUsuarioId = (usuario_id) => (dispatch) => {
	dispatch({
		type: "cambio_usuario_id",
		payload: usuario_id
	})
}

// esta accion va a cambiar titulo mandando un dispatch que modifica ese atributo del reducer, recibe por parametro lo que se escribio en el input
export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: "cambio_titulo",
		payload: titulo
	})
}
