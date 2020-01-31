import axios from 'axios'; //importamos axios para hacer peticiones http
import { 
	TRAER_TODAS, 
	CARGANDO, 
	ERROR,
	CAMBIO_USUARIO_ID,
	CAMBIO_TITULO,
	GUARDAR,
	ACTUALIZAR,
	LIMPIAR
} from '../types/tareasTypes'; // IMPORTAMOS SOLAMENTE la constante TRAER_TODOS de esta ruta ../types/usuariosTypes

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
		type: CAMBIO_USUARIO_ID,
		payload: usuario_id
	})
}

// esta accion va a cambiar titulo mandando un dispatch que modifica ese atributo del reducer, recibe por parametro lo que se escribio en el input
export const cambioTitulo = (titulo) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: titulo
	})
}

// actions que recibe por parametro un objeto con la info de la nueva tarea, que se mandara a la API para que la API lo maneje
export const agregar = (nueva_tarea) => async (dispatch) => {
	// dispatch de cargando
	dispatch({
		type: CARGANDO
	})

	try {
		//peticion POST el segundo parametro es el objeto que le voy a agregar a la API, y me retorna la respuesta de la peticion en respuesta.data el nuevo campo que se agrego, porque la api es una api fake.
		const respuesta = await axios.post("https://jsonplaceholder.typicode.com/todos", nueva_tarea)

		// dispatch de tipo agregada para que se actualize el estado y no le doy payload porque ya se guardo en la base de datos
		dispatch({
			type: GUARDAR
		})
	} catch (error) {
		console.log(error.message)
		dispatch({
			type: ERROR,
			payload: "Intente más tarde"
		})
	}
}

// actions que recibe por parametro un objeto con la info a modificar de una tarea, que se mandara a la API para que la API la modifique
export const editar = (tarea_editada) => async (dispatch) => {
	// dispatch de cargando
	dispatch({
		type: CARGANDO
	})

	try {
		//peticion PUT el segundo parametro es el objeto que le voy a modificar a la API, y me retorna la respuesta de la peticion en respuesta.data el nuevo campo que se agrego, porque la api es una api fake.
		const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)

		// dispatch de tipo agregada para que se actualize el estado y no le doy payload porque ya se modifico en la base de datos
		dispatch({
			type: GUARDAR
		})
	} catch (error) {
		console.log(error.message)
		dispatch({
			type: ERROR,
			payload: "Intente más tarde"
		})
	}

}

// actions que se llama cada vez que seleccionen un checkbox, recibe por parametro el id del usuario y el id de la tarea que se le dio click
export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	// destructuro las tareas, del tareasReducer
	const { tareas } = getState().tareasReducer;

	// guardo en variable la tarea seleccionada, en especifico
	const seleccionada = tareas[usu_id][tar_id]

	// guardo en variable la tarea seleccionada, en especifico y hago un objeto de inmutabilidad que será igual a todas las tareas pero a la tarea que se pincho en el checkbox el valor del completed será el contrario
	const actualizadas = {
		...tareas
	}
	// seleciono las tareas del usuario y va a ser igual a todas las tareas de ese usuario.
	actualizadas[usu_id] = {
		...tareas[usu_id]
	}
	// de todas las tareas del usuario selecionamos la tarea que se le dio click y sera igual a las tareas del usuario y el completed va a hacer lo diferente de la tarea seleccionada
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	// dispatch mandando en especifico, un objeto con todas las tareas pero a la tarea que se le dio click le modifico el completed
	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})

}


// actions que cuando den click al boton de eliminar se llama y recibe por parametro el id de la tarea y ejecuta una peticion de tipo DELETE
export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	})

	try {
		// ejecuta la peticion de tipo delete al endpoint en especifico de la tarea
		const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`)

		// dispatch de tipo traer todas y como payload le mando nada para que las vuelva a buscar, como ya se elimino una tarea voy a querer limpiar las tareas para que vuelva a recargar todas las tareas
		dispatch({
			type: TRAER_TODAS,
			payload: {}
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: ERROR,
			payload: "Servicio no disponible"
		})
	}
}

// actions que limpia los input
export const limpiarForma = () => (dispatch) => {

	dispatch({
		type: LIMPIAR
	})
}

