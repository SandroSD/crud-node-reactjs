import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const navegacion = () => {
	return(
		<Row style={{height: "3vh"}}>
			<Col xs={{size:3, offset:4}}>
				<Link to="/listarPersonas">Listar Personas</Link>
			</Col>
			<Col xs="3">
				<Link to="/formPersonas">Registrar Personas</Link>
			</Col>
		</Row>
	);
}

export default navegacion;