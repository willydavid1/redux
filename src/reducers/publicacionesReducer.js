import { ACTUALIZAR, CARGANDO, ERROR, COM_ERROR, COM_CARGANDO } from '../types/publicacionesTypes'; // IMPORTAMOS SOLAMENTE las constante TRAER_TODOS de esta ruta ../types/publicacionesTypes

// inicializamos un estado
const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: '',
	com_cargando: false,
	com_error: ''
};

//aquí se crea la función, el estado inicial, y la acción es la "tarea a realizar"
export default (state = INITIAL_STATE, action) => {
	//se crea el switch porque llegaran varias tareas y solo se distingue por el nombre
	switch (action.type) {
		case ACTUALIZAR:
			return {
				...state,
				publicaciones: action.payload,
				cargando: false,
				error: ''
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case COM_CARGANDO:
			return { ...state, com_cargando: true };

		case COM_ERROR:
			return { ...state, com_error: action.payload, com_cargando: false };

		default:
			return state;
	}
};
