import React, { Component } from 'react';

//importo cosas de redux
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions'; // actions

class Guardar extends Component {

    // manejador de eventos, se llama cuando ocurra un cambio en el input
    cambioUsuarioId = (event) => {

        // llama al actions y le mando lo que se escribe en el input
        this.props.cambioUsuarioId(event.target.value)
    }

    // manejador de eventos, se llama cuando ocurra un cambio en el input
    cambioTitulo = (event) => {

        // llama al actions y le mando lo que se escribe en el input
        this.props.cambioTitulo(event.target.value)
    }


	render() {
		return (
			<div>
				<h1>Guardar Tarea</h1>

				Usuario id:
                <input 
                    type="number" 
                    value={ this.props.usuario_id } 
                    onChange={ this.cambioUsuarioId }
                />

				<br />
				<br />

				Titulo:
                <input 
                    type="text" 
                    value={ this.props.titulo } 
                    onChange={ this.cambioTitulo }
                />

                <br />
				<br />

                <button>
                    Guardar
                </button>
			</div>
		);
	}
}

// Recibe todos los reducers y destructuramos el reducers que usaremos
const mapStateToProps = ({tareasReducer}) => tareasReducer;

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, tareasActions)(Guardar);
