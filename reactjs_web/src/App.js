import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navegacion from './container/Navegacion/navegacion';
import Header from '../src/container/Header/Header';
import Routes from '../src/container/Routes/Routes';
//import Footer from '../src/container/Footer/Footer';

class App extends Component {
	
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Header />
					<hr />
					<Navegacion />
					<hr />
					<Routes />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;