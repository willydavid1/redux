import React, { Component } from 'react';

//importo cosas de redux
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions'; // actions

import Spinner from "../General/Spinner"
import Fatal from "../General/Fatal"

import { Redirect } from "react-router-dom"

class Guardar extends Component {

    componentDidMount() {
        // destructurar los parametros de la url el id del usuario y el id de la tarea
        const {
            match: {params : { usu_id, tar_id }},
            tareas,
            cambioUsuarioId,
            cambioTitulo
        } = this.props

        // si usu_id y tar_id existe en el URL llama a los actions y le mandamos como parametro la tarea
        if (usu_id && tar_id) {

            // tarea va a ser igual a la tarea en especifico del usuario que se le dio click
            const tarea = tareas[usu_id][tar_id]

            // llamo a los dos actions que modifique los inputs y estado por la tarea que se le dio click
            cambioUsuarioId(tarea.userId)
            cambioTitulo(tarea.title)
        }

    }

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
        const { 
            match: {params : { usu_id, tar_id }},
            tareas,
            usuario_id, 
            titulo, 
            agregar,
            editar } = this.props

        // objeto que tiene los valores de la nueva tarea que se enviara a la API
        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        }

        // si esas variables vienen en la URL ejecuta esto, caso contrario LLAMA al dispatch de tipo POST
        if (usu_id && tar_id) {

            // tarea va a ser igual a la tarea en especifico del usuario que se le dio click
            const tarea = tareas[usu_id][tar_id];

            // un objeto con todo lo que tenia la nueva_tarea y pisamos completed por la que esta en el estado y le entregamos un atributo adicional llamado id mandandole el id de la tarea, tiene los valores que va modificar en la API
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id
            }

            // llamo al dispatch que va a hacer la peticion de tipo PUT
            editar(tarea_editada)
        }
        else{

            // llamo al action que va a hacer la peticion POST
            agregar(nueva_tarea)   
        }

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
                    // si regresar esta en true redirigimos a /tareas caso contrario ejecuta nada
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
