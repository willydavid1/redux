import React, { Component } from 'react';

class Guardar extends Component {
	render() {
		return (
			<div>
				<h1>Guardar Tarea</h1>

				Usuario id:
				<input type="number" />

				<br />
				<br />

				Titulo:
				<input type="text" />

                <br />
				<br />

                <button>
                    Guardar
                </button>
			</div>
		);
	}
}

export default Guardar;
