import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { RESET_EMAIL_MUTATION } from '../mutations';
import { CURRENT_USER_ACCOUNT_QUERY } from '../queries';

class ResetPassword extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	};

	state = {
		email: '',
		confirmEmail: ''
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	handleFormSubmit = async (e, resetEmail) => {
		e.preventDefault();
		await resetEmail().then(() => Router.push('/account'));
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { email, confirmEmail } = this.state;
		const { resetToken } = this.props;

		return (
			<Mutation mutation={RESET_EMAIL_MUTATION}
			          variables={{ resetToken, ...this.state }}
			          refetchQueries={[{ query: CURRENT_USER_ACCOUNT_QUERY }]}>
				{(resetEmail, { loading, error }) =>
					<Form method="post" onSubmit={e => handleFormSubmit(e, resetEmail)} noValidate>
						<h2>Change Your Email</h2>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="password">
								Enter Current Email
								<input type="email"
								       id="email"
								       placeholder="Current Email"
								       value={email}
								       onChange={handleInputChange} />
							</label>
							<label htmlFor="confirmPassword">
								Enter New Email
								<input type="email"
								       id="confirmEmail"
								       placeholder="New Email"
								       value={confirmEmail}
								       onChange={handleInputChange} />
							</label>
							<button type="submit">Change Email</button>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default ResetPassword;