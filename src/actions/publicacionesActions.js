import axios from 'axios';
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionesTypes'; // IMPORTAMOS SOLAMENTE las constante TRAER_TODOS de esta ruta ../types/publicacionesTypes

// creamos un action creator que va hacer la llamada a un único usuario, recibe por parametro key que es el índice del ítem del arreglo que se esta enviando
export const traerPorUsuario = (key) => async (dispatch, getState) => {
	const { usuarios } = getState().usuariosReducer; //getState puedo tener acceso al estado actual, voy a traer los usuarios que hay en ese reducer
	const { publicaciones } = getState().publicacionesReducer; //getState puedo tener acceso al estado actual, voy a traer las publicaciones de publicacionesReducer
	const usuario_id = usuarios[key].id //saco el id del usuario | el parametro key que recibe es el índice del ítem del arreglo
	
	const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

	// de las publicaciones del reducer lo despliego aqui y le agrego las publicaciones nuevas
	const publicaciones_actualizadas = [
		...publicaciones,
		respuesta.data
	]
	
	dispatch({
		type: TRAER_POR_USUARIO,
		payload: publicaciones_actualizadas
	});
}
