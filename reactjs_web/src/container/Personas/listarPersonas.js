import React, { Component } from 'react';

import { Row, Col, Table, Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

class ListarPersonas extends Component {
	render() {
		return (
			<Row>
				<Col xs={{size:9, offset:3}}>
					<Table striped>
						<thead style={{textAlign: "center"}}>
							<tr>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>#</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>a</td>
								<td>b</td>
								<td style={{width: "10%"}}>
									<Button color="primary">A</Button>
									<Button color="info">B</Button>
									<Button color="danger">C</Button>
								</td>
							</tr>
							<tr>
								<td>e</td>
								<td>f</td>
								<td>g</td>
							</tr>
							<tr>
								<td>h</td>
								<td>i</td>
								<td>j</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		);
	}
}

export default ListarPersonas;