import React from 'react';

// este componente solo muestra el error que lo recibe por props
const Fatal = (props) => (
    <h2 className="center rojo">
        { props.mensaje }
    </h2>
);

export default Fatal;