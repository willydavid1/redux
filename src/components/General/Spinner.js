import React from 'react';
import '../../css/spinner.css'; //importamos los estilos de la animacion del loader

//este componente solo muestra la animacion
const Spinner = (props) => (
	<div className="center">
		<div className="lds-spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
);

export default Spinner;
