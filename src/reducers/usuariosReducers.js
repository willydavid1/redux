import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'; // IMPORTAMOS SOLAMENTE la constante TRAER_TODOS de esta ruta ../types/usuariosTypes

// inicializamos un estado
const INITIAL_STATE = {
	usuarios: [],
	cargando: false,
	error: ''
};

//aquí se crea la función, el estado inicial, y la acción es la "tarea a realizar"
export default (state = INITIAL_STATE, action) => {
	//se crea el switch porque llegaran varias tareas y solo se distingue por el nombre
	switch (action.type) {
		case TRAER_TODOS:
			//la tarea que llegara en esta ocasión es 'traer_usuarios'
			return {
				...state,
				usuarios: action.payload,
				cargando: false,
				error: ''
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		default:
			return state;
	}
};
