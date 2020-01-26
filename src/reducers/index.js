import { combineReducers } from 'redux';
import usuariosReducer from './usuariosReducers'; //importamos un reducer
import publicacionesReducer from './publicacionesReducer'; //importamos un reducer
import tareasReducer from './tareasReducer'; //importamos un reducer

export default combineReducers({
	usuariosReducer,
	publicacionesReducer,
	tareasReducer
});
