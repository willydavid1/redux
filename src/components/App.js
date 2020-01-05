import React from 'react';

const App = () => {
	return (
		<div className="margen">
			<table className="tabla">
				<thead>
					<th>Nombre</th>
					<th>Correo</th>
					<th>Enlace</th>
				</thead>

				<tbody>
					<tr>
						<td>Willy</td>
						<td>willydavid1@hotmial.com</td>
						<td>willydavid1.github.io</td>
					</tr>

					<tr>
						<td>platzi</td>
						<td>platzi@hotmial.com</td>
						<td>platzi.com</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default App;
