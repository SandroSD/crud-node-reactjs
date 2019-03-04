import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ListarPersonas from '../Personas/listarPersonas';
import FormPersonas from '../Personas/formPersonas';
import Navegacion from '../Navegacion/navegacion';

const routes = () => {
	return(
		<BrowserRouter>
			<div style={{height: "84.5vh"}}>
				<Navegacion />
				<hr />
				<Switch>
					<Route path="/" component={ListarPersonas} exact />
					<Route path="/listarPersonas" component={ListarPersonas} />
					<Route path="/formPersonas" component={FormPersonas} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default routes;