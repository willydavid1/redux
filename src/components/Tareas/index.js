import React, { Component } from 'react';

//importo cosas de redux
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions'; // actions

class Tareas extends Component {
	componentDidMount() {
		this.props.traerTodas();
	}

	render() {
		console.log(this.props);
		return <div>Tareas Saludar</div>;
	}
}

// Recibe todos los reducers y destructuramos el reducers que usaremos
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, tareasActions)(Tareas);
