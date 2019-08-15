import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import Router from 'next/router';
import Link from 'next/link';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { SIGNIN_MUTATION } from '../mutations';
import { LOCAL_STATE_QUERY } from '../queries';

class Signin extends Component {
	state = {
		email: '',
		password: ''
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	handleFormSubmit = async (e, signin) => {
		e.preventDefault();
		await signin()
			.then(() => this.props.client.resetStore())
			.then(() => Router.push('/items'))
			.then(() => this.props.client.cache.writeQuery({ query: LOCAL_STATE_QUERY, data: { cartOpen: false } }));
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { email, password } = this.state;

		return (
			<Mutation mutation={SIGNIN_MUTATION}
			          variables={this.state}>
				{(signin, { loading, error }) =>
					<Form method="post" onSubmit={e => handleFormSubmit(e, signin)} noValidate>
						<h2>Sign Into Your Account</h2>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="email">
								Email
								<input type="text"
								       id="email"
								       placeholder="Email"
								       value={email}
								       onChange={handleInputChange} />
							</label>
							<label htmlFor="password">
								Password
								<input type="password"
								       id="password"
								       placeholder="Password"
								       value={password}
								       onChange={handleInputChange} />
							</label>
							<button type="submit">Sign In</button>
							<Link href="/password-request-reset"><a className="request-reset-link">Forgot Password?</a></Link>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default withApollo(Signin);