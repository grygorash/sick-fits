import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!, $passwordConfirm: String!){
        signup(email: $email, name: $name, password: $password, passwordConfirm: $passwordConfirm){
            id
            email
            name
        }
    }
`;

class Signup extends Component {
	state = {
		email: '',
		name: '',
		password: '',
		passwordConfirm: ''
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	handleFormSubmit = async (e, signup) => {
		e.preventDefault();
		await signup().then(() => Router.push('/signin'));
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { email, name, password, passwordConfirm } = this.state;
		return (
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
				{(signup, { loading, error }) =>
					<Form method="post" onSubmit={e => handleFormSubmit(e, signup)} noValidate>
						<h2>Sign Up An Account</h2>
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
							<label htmlFor="name">
								Name
								<input type="text"
								       id="name"
								       placeholder="Name"
								       value={name}
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
							<label htmlFor="password">
								Confirm Password
								<input type="password"
								       id="passwordConfirm"
								       placeholder="Confirm Password"
								       value={passwordConfirm}
								       onChange={handleInputChange} />
							</label>
							<button type="submit">Sign Up</button>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default Signup; 