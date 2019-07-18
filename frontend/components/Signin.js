import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!){
        signin(email: $email, password: $password){
            id
            email
            name
        }
    }
`;

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
		await signin().then(() => Router.push('/items'));

	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { email, password } = this.state;
		return (
			<Mutation mutation={SIGNIN_MUTATION}
			          variables={this.state}
			          refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
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
							<Link href="/request-reset"><a className="request-reset-link">Forgot Password?</a></Link>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default Signin;