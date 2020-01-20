import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes'; // IMPORTAMOS SOLAMENTE las constante TRAER_TODOS de esta ruta ../types/publicacionesTypes

export const traerTodos = () => async (dispatch) => {
    dispatch({
		type: CARGANDO,
	})
	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
		dispatch({
			type: TRAER_TODOS,
			payload: respuesta.data
		});
	} catch (error) {
        console.log("error:" + error.message)
		dispatch({
			type: ERROR,
			payload: "Algo salió mal, intente más tarde."
		});
    }
};

// creamos un action creator que va hacer la llamada a un único usuario, recibe por parametro key que es el índice del ítem del arreglo que se esta enviando
export const traerPorUsuario = (key) => async (dispatch, getState) => {
	const { usuarios } = getState().usuariosReducer; //getState puedo tener acceso al estado actual, voy a traer los usuarios que hay en ese reducer
	const usuario_id = usuarios[key].id //saco el id del usuario | el parametro key que recibe es el índice del ítem del arreglo
	
	const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
	dispatch({
		type: TRAER_TODOS,
		payload: respuesta.data
	});
}
