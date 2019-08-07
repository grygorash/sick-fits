import React, { Component } from 'react';
import ErrorPage from '../components/ErrorPage';

class Error extends Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return { statusCode };
	}

	render() {
		return <ErrorPage status={this.props.statusCode} text='Page does not exist'/>;

	}
}

export default Error;