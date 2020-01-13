import { TRAER_TODOS } from "../types/usuariosTypes" // IMPORTAMOS SOLAMENTE la constante TRAER_TODOS de esta ruta ../types/usuariosTypes

// inicializamos un estado
const INITIAL_STATE = {
	usuarios: []
};

//aquí se crea la función, el estado inicial, y la acción es la "tarea a realizar"
export default (state = INITIAL_STATE, action) => {
	//se crea el switch porque llegaran varias tareas y solo se distingue por el nombre
	switch (action.type) {
		case TRAER_TODOS:
			//la tarea que llegara en esta ocasión es 'traer_usuarios'
			return { ...state, usuarios: action.payload };

		default:
			return state;
	}
};
