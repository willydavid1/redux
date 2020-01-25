import axios from 'axios';
import { ACTUALIZAR, CARGANDO, ERROR } from '../types/publicacionesTypes'; // IMPORTAMOS SOLAMENTE las constante TRAER_TODOS de esta ruta ../types/publicacionesTypes
import * as usuariosTypes from '../types/usuariosTypes' //importamos los types de usuarios

// destructuramos y renombramos el tipo de traer todos
const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

// creamos un action creator que va hacer la llamada a un único usuario, recibe por parametro key que es el índice del ítem del arreglo que se esta enviando
export const traerPorUsuario = (key) => async (dispatch, getState) => {

	dispatch({
		type: CARGANDO
	});

	const { usuarios } = getState().usuariosReducer; //getState puedo tener acceso al estado actual, voy a traer los usuarios que hay en ese reducer
	const { publicaciones } = getState().publicacionesReducer; //getState puedo tener acceso al estado actual, voy a traer las publicaciones de publicacionesReducer
	const usuario_id = usuarios[key].id //saco el id del usuario | el parametro key que recibe es el índice del ítem del arreglo
	
	try {
		const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

		// variable sera un arreglo de objetos con todo lo que me trae respuesta.data y le agrego a cada publicacion dos atributos mas
		const nuevas = respuesta.data.map( (publicacion) => ({
			...publicacion,
			comentarios: [],
			abierto: false
		}));

		// de las publicaciones del reducer lo despliego aqui y le agrego las publicaciones nuevas que recibimos de este usuario
		const publicaciones_actualizadas = [
			...publicaciones,
			nuevas
		]

		// envia al publicaciones_reducers el arreglo con las publicaciones del usuario que se estan viendo y despues hacemos el proximo dispatch al usuario en esta casilla están tus publicaciones 
		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas
		});

		// Falta decirle al usuariosReducer tus publicaciones están en esta casilla del arreglo.
		// NECESITO SACAR LA ULTIMA CASILLA DE ESTAS PUBLICACIONES actualizadas | me da el numero de casillas que hay (1er render da cero y en el re-render hay uno) y le restp 1 para sacar la casilla
		// Ahora tengo que actualizar los usuarios, creo un nuevo arreglo con todos estos usuarios que hay en el estado actual
		// al usuario en especifico de ese arreglo le creare un atributo, con la posicion de su key o index.
		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key
		}
		
		// dispatch para mandar los usuarios actualizados a usuariosReducer que es un arreglo con todos los usuarios solo que con un atributo llamado publicaciones_key que nos dice en que casilla del arreglo están las publicaciones del usuario
		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles' 
		})
	}
}

// actions que recibe por parametro la casilla de donde están las publicaciones de este usuario y a cual publicación en especifico fue a la que le di click (sacamos el índice de la publicación del map)
export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {

	const { publicaciones } = getState().publicacionesReducer; //getState puedo tener acceso al estado actual, voy a traer las publicaciones de publicacionesReducer (las publicaciones es un arreglo que tiene dentro las publicaciones)
	const seleccionada = publicaciones[pub_key][com_key] //de todas las publicaciones de este usuario vas a seleccionar la publicacion que le di click

	// despliega especificamente la publicacion a la que le dio click y modificamos la propiedad de abierto por el contrario que seleccionada tiene abierto: !seleccionada.abierto
	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	}

	const publicaciones_actualizadas = [...publicaciones]; // esta constante sera el arreglo con todas las publicaciones
	// seleccionamos las publicaciones del usuario y desplegamos todas las publicaciones de este usuario
	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	// de todas las publicaciones del usuario, selecciono a la que se le dio click y sera igual a la publicacion pero con el abierto cambiado 
	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	// Hago un dispatch mandando el arreglo con todas las publicaciones de los usuarios al PublicacionesReducer, pero a la publicación que se le dio click será igual a la publicación pero con el atributo abierto cambiado.
	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	});

}

// va a buscar los comentarios de la publicacion que se le dio click, actions que recibe por parametro la casilla de donde están las publicaciones de este usuario y a cual publicación en especifico fue a la que le di click (sacamos el índice de la publicación del map)
export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {

	const { publicaciones } = getState().publicacionesReducer; //getState puedo tener acceso al estado actual, voy a traer las publicaciones de publicacionesReducer (las publicaciones es un arreglo que tiene dentro las publicaciones)
	const seleccionada = publicaciones[pub_key][com_key] //de todas las publicaciones de este usuario vas a seleccionar la publicacion que le di click

	// buscamos los comentarios de la publicacion a la que se le dio click.
	const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

	// objeto que depliega todo lo que tiene la publicacion que le di click, y el atributo comentarios por los comentarios de la publicacion a la que se le dio click, lo cambio por el respuesta.data
	const actualizada = {
		...seleccionada,
		comentarios: respuesta.data
	}

	// hacemos inmutabilidad
	const publicaciones_actualizadas = [...publicaciones]; // esta constante sera el arreglo con todas las publicaciones
	// seleccionamos las publicaciones del usuario y desplegamos todas las publicaciones de este usuario
	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	// de todas las publicaciones del usuario, selecciono a la que se le dio click y sera igual a la publicacion pero con los comentarios de la publicacion actualizados
	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	// Hago un dispatch mandando el arreglo con todas las publicaciones de los usuarios al PublicacionesReducer, pero a la publicación que se le dio click será igual a la publicación pero con el atributo comentarios actualizados.
	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	});

}
