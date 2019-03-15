import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, FormFeedback,Label, Input, Button} from 'reactstrap';

class FormPersonas extends Component {
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
		errors:[]
	}

	render() {

		this.handlerChange = (ev) => {
			const miState = {...this.state};
			ev.target.value ? miState.form[ev.target.name] = ev.target.value : miState.form[ev.target.name] = '';
			this.setState(miState);
		}

		this.handlerSubmit = (event) => {
			event.preventDefault();
			fetch("http://localhost:3003/user",{
				method: 'POST',
				body: JSON.stringify(this.state.form)
			}).then(result => result.json())
				.then(result => console.log("result", result));
			
		}

		const {form} =	{...this.state};

		return (
			<Col xs={{size:10, offset: 1}}>
				<Card>
					<CardHeader style={{backgroundColor:"grey", color:"white", fontWeight:"bold"}}>
						Nueva Persona
					</CardHeader>
					<CardBody>
						<Form	onSubmit={this.handlerSubmit.bind(this)}>
							<Card>
								<CardHeader style={{backgroundColor: "lightblue", fontWeight:"bold"}}>Datos Personales</CardHeader>
								<CardBody>
									<Row>
										<Col xs="6">
											<FormGroup>
												<Label for="nombre">Nombre</Label>
												<Input	type="text" name="nombre" placeholder="Ingrese el nombre..."
														onChange={this.handlerChange}
														value={form.nombre ? form.nombre : ''} />
												<FormFeedback></FormFeedback>
											</FormGroup>
										</Col>
										<Col xs="6">
											<FormGroup>
												<Label for="apellido">Apellido</Label>
												<Input	type="text" name="apellido" placeholder="Ingrese el apellido..."
														onChange={this.handlerChange}
														value={form.apellido ? form.apellido : ''} />
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col xs="4">
											<FormGroup>
												<Label for="mail">Mail</Label>
												<Input	type="text" name="mail" placeholder="Ingrese el mail..."
														onChange={this.handlerChange}
														value={form.mail ? form.mail : ''} />
											</FormGroup>
										</Col>
										<Col xs="4">
											<FormGroup>
												<Label for="celular">Celular</Label>
												<Input	type="text" name="celular" placeholder="Ingrese el celular..."
														onChange={this.handlerChange}
														value={form.celular ? form.celular : ''} />
											</FormGroup>
										</Col>
										<Col xs="4">
											<FormGroup>
												<Label for="fechaNacimiento">Fecha de Nacimiento</Label>
												<Input	type="date" name="fechaNacimiento" placeholder="Ingrese fecha de nacimiento..."
														onChange={this.handlerChange}
														value={form.fechaNacimiento ? form.fechaNacimiento : ''} />
											</FormGroup>
										</Col>
									</Row>
								</CardBody>
							</Card>
							<br />
							<Card>
								<CardHeader style={{backgroundColor: "lightblue", fontWeight:"bold"}}>Dirección</CardHeader>
								<CardBody>
									<Row>
										<Col xs="4">
											<FormGroup>
												<Label for="calle">Calle</Label>
												<Input	type="text" name="calle" placeholder="Ingrese la calle..."
														onChange={this.handlerChange}
														value={form.calle ? form.calle : ''} />
											</FormGroup>
										</Col>
										<Col xs="4">
											<FormGroup>
												<Label for="numero">Número</Label>
												<Input	type="text" name="numero" placeholder="Ingrese el número..."
														onChange={this.handlerChange}
														value={form.numero ? form.numero : ''} />
											</FormGroup>
										</Col>
										<Col xs="4">
											<FormGroup>
												<Label for="codigoPostal">Código Postal</Label>
												<Input	type="text" name="codigoPostal" placeholder="Ingrese código postal..."
														onChange={this.handlerChange}
														value={form.codigoPostal ? form.codigoPostal : ''} />
											</FormGroup>
										</Col>
									</Row>
								</CardBody>
							</Card>
							<br />
							<Row>
								<Col xs="12" align="right">
									<Button color="success">Registrar</Button>
								</Col>
							</Row>
						</Form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default FormPersonas;