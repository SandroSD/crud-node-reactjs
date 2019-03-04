import React, { Component } from 'react';

import Header from '../src/container/Header/Header';
import Routes from '../src/container/Routes/Routes';
import Footer from '../src/container/Footer/Footer';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<hr />
				<Routes />
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;