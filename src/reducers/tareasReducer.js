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


// inicializamos un estado
const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '',
	titulo: '',
	regresar: false
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
				error: '',
				regresar: false
			};

		case CARGANDO:
			return { ...state, cargando: true };

		case ERROR:
			return { ...state, error: action.payload, cargando: false };

		case CAMBIO_USUARIO_ID:
			return { ...state, usuario_id: action.payload }
		
		case CAMBIO_TITULO:
			return { ...state, titulo: action.payload }

		case GUARDAR:
			return { ...state, tareas:{}, cargando: false, error: "", regresar: true, usuario_id: "", titulo: ""}

		case ACTUALIZAR:
			return { ...state, tareas: action.payload }
			
		case LIMPIAR:
			return { ...state, usuario_id: "", titulo:"" }

		default:
			return state;
	}
};
