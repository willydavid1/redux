import axios from "axios"; //importamos axios para hacer peticiones http

//esta funcion traerTodos retorna otra función, dispatch (envio) es el que va a disparar esa llamada y va a contactar al reducer para que haga el cambio de estado
export const traerTodos = () => async (dispatch) => {
	//hacemos una peticion de tipo get a la API y la respuesta es una promesa y para leerla usaremos async/await
	const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users'); //retorna un promesa y cuando se resuelva esa promesa asignala a la variable
	
	dispatch({
		type: 'traer_usuarios',
		payload: respuesta.data
	});
};
