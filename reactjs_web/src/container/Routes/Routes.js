import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListarPersonas from '../Personas/listarPersonas';
import FormPersonas from '../Personas/formPersonas';

const routes = () => {
	return(
		<Switch>
			<Route path="/" component={ListarPersonas} exact />
			<Route path="/listarPersonas" component={ListarPersonas} />
			<Route path="/formPersonas" component={FormPersonas} />
			<Route path="/formPersonas/:id" component={FormPersonas} />
		</Switch>
	);
}

export default routes;