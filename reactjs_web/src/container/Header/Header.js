import React from 'react';
import { Col } from 'reactstrap';
import './Header.css';

const header = () => {
	return(
		<Col xs="12">
			<Col className="style">
				Administrar Personas
			</Col>
		</Col>
	);
}

export default header;