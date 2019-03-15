import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PersonaGrid from '../../components/PersonaGrid/personaGrid';

class ListarPersonas extends Component {
	state = {
		form: {
			nombre: '',
			apellido: '',
			mail: '',
			celular: '',
			fechaNacimiento: '',
			direccion: {
				calle: '',
				numero: '',
				codigoPostal: ''
			}
		},
		personas: []
	}

	componentDidMount() {
		fetch("http://localhost:3003/users")
			.then(data => data.json())
			.then(res => {
				const miState = {...this.state};
				miState.personas = res;
				this.setState(miState);
			});
	}

	render() {
		return (
			<Row>
				<Col xs={{size:10, offset:1}}>
					<PersonaGrid personas={this.state.personas} />
				</Col>
			</Row>
		);
	}
}

export default ListarPersonas;