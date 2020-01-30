import React, { Component } from 'react';

//importo cosas de redux
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions'; // actions

import Spinner from "../General/Spinner"
import Fatal from "../General/Fatal"

import { Redirect } from "react-router-dom"

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

    // maneja el evento click del boton guardar
    guardar = () => {
        // destructuro el estado, que tiene lo que escribio en el input
        const { usuario_id, titulo, agregar } = this.props

        // objeto que tiene los valores de la nueva tarea que se enviara a la API
        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        }

        // llamo al action que va a hacer la peticion POST
        agregar(nueva_tarea)
    }

    // funcion del boton que si retorna true se deshabilita el boton
    deshabilitar = () => {

        // destructuro la infomacion del estado, que es lo que escribe de los inputs
        const { usuario_id, titulo, cargando } = this.props

        // si esta cargando retorna true
        if (cargando) {
            return true
        }

        // si no esta la informacion del usuario id o en el titulo, lo de los inputs
        if (!usuario_id || !titulo) {
            return true
        }

        // si todo esta bien retorna false para que se habilite el boton
        return false;
    }

    // se llamara debajo del boton solo cuando den click al boton
    mostrarAccion = () => {
        // destructura el error y el cargando del estado
        const { error, cargando } = this.props;

        // si esta cargando retorno el spinner y si hay un error se llama al fatal
        if (cargando) {
            return <Spinner />
        }

        if (error) {
            return <Fatal mensaje={error} />
        }
    }
    
     

	render() {
		return (
			<div>
                {
                    // si regresar esta en true redirigimos a /tareas caso contrario no ejecuta nada
                   (this.props.regresar) ? <Redirect to="/tareas" /> : ""
                }
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

                <button 
                    onClick={ this.guardar }
                    disabled={ this.deshabilitar() }
                >
                    Guardar
                </button>
                { this.mostrarAccion() }
			</div>
		);
	}
}

// Recibe todos los reducers y destructuramos el reducers que usaremos
const mapStateToProps = ({tareasReducer}) => tareasReducer;

// Ya en el connect recibe la función mapStateToProps, las acciones y por ultimo nos llega por props ese reducer es decir el estado y los action creators por props
export default connect(mapStateToProps, tareasActions)(Guardar);
