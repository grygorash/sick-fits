import React from 'react';
import ErrorPageStyles from './styles/ErrorPageStyles';

const ErrorPage = ({ status, text }) =>
	<ErrorPageStyles>
		<h3>{status}</h3>
		<p>{text}</p>
	</ErrorPageStyles>;

export default ErrorPage;