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

		dispatch({
			type: TRAER_TODAS,
			payload: respuesta.data
		});
	} catch (error) {
		console.log('error:' + error.message);
		dispatch({
			type: ERROR,
			payload: 'Información de tareas no disponible.'
		});
	}
};
