import React, {Component} from 'react';
import { Row, Col, Table, Button, Card, CardHeader, CardBody } from 'reactstrap';
import './personaGrid.css';
import {withRouter} from 'react-router-dom';

class personaGrid extends Component{
	
	render(){
		const {personas} = {...this.props};

		this.onClickHandler = () => {
			this.props.history.push('/formPersonas');
		}
	
		return(
			<Col xs="12">
				<Col className="style">
					<Card>
						<CardHeader>
							<Row>
								<Col xs="10" align="left" id="titulo">
									Personas Registradas
								</Col>
								<Col xs="2" align="right">
									<Button color="success" onClick={this.onClickHandler}>
										Registrar
									</Button>
								</Col>
							</Row>
						</CardHeader>
						<CardBody>
							<Table striped>
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Apellido</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{
										personas.map((persona, index) => {
											return(
												<tr key={index}>
													<td>{index}</td>
													<td>{persona.nombre}</td>
													<td>{persona.apellido}</td>
													<td style={{width: "25%"}} id="cuartoTD">
														<Button color="primary">Modificar</Button>
														<Button color="danger">Borrar</Button>
													</td>
												</tr>
											);
										})
									}
								</tbody>
							</Table>
						</CardBody>
					</Card>
				</Col>
			</Col>
		);
	}
}

export default withRouter(personaGrid);