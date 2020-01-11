//esta funcion traerTodos retorna otra función, dispatch (envio) es el que va a disparar esa llamada y va a contactar al reducer para que haga el cambio de estado
export const traerTodos = () => (dispatch) => {
	dispatch({
		type: 'traer_usuarios',
		payload: [1, 2, 3]
	});
};
