import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes'; // IMPORTAMOS SOLAMENTE la constante TRAER_TODOS de esta ruta ../types/usuariosTypes

// inicializamos un estado
const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '9',
	titulo: 'qwerty'
};

//aquí se crea la función, el estado inicial, y la acción es la "tarea a realizar"
export default (state = INITIAL_STATE, action) => {
	//se crea el switch porque llegaran varias tareas y solo se distingue por el nombre
	switch (action.type) {
		case TRAER_TODAS:
			//la tarea que llegara en esta ocasión es 'traer_usuarios'
			return {
				...state,
				tareas: action.payload,
				cargando: false,
				error: ''
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case "cambio_usuario_id":
			return { ...state, usuario_id: action.payload }
		
		case "cambio_titulo":
			return { ...state, titulo: action.payload }

		default:
			return state;
	}
};
