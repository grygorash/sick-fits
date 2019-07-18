import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email){
            message
        }
    }
`;

class RequestReset extends Component {
	state = {
		email: ''
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	handleFormSubmit = async (e, requestReset) => {
		e.preventDefault();
		await requestReset().then(() => this.setState({ email: '' }));
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { email } = this.state;
		return (
			<Mutation mutation={REQUEST_RESET_MUTATION}
			          variables={this.state}>
				{(requestReset, { loading, error, called }) =>
					<Form method="post" onSubmit={e => handleFormSubmit(e, requestReset)} noValidate>
						<h2>Request a password reset</h2>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							{!error && !loading && called && <p className="message-success">Success! Check your email for a reset link!</p>}
							<label htmlFor="email">
								Email
								<input type="text"
								       id="email"
								       placeholder="Email"
								       value={email}
								       onChange={handleInputChange} />
							</label>
							<button type="submit">Request Reset</button>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default RequestReset;