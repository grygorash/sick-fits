import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { RESET_PASSWORD_MUTATION } from '../mutations';
import { CURRENT_USER_ACCOUNT_QUERY } from '../queries';

class ResetPassword extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	};

	state = {
		password: '',
		confirmPassword: ''
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	handleFormSubmit = async (e, resetPassword) => {
		e.preventDefault();
		await resetPassword().then(() => Router.push('/items'));
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { password, confirmPassword } = this.state;
		const { resetToken } = this.props;

		return (
			<Mutation mutation={RESET_PASSWORD_MUTATION}
			          variables={{ resetToken, ...this.state }}
			          refetchQueries={[{ query: CURRENT_USER_ACCOUNT_QUERY }]}>
				{(resetPassword, { loading, error }) =>
					<Form method="post" onSubmit={e => handleFormSubmit(e, resetPassword)} noValidate>
						<h2>Reset Your Password</h2>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="password">
								Enter New Password
								<input type="password"
								       id="password"
								       placeholder="Password"
								       value={password}
								       onChange={handleInputChange} />
							</label>
							<label htmlFor="confirmPassword">
								Confirm New Password
								<input type="password"
								       id="confirmPassword"
								       placeholder="Confirm Password"
								       value={confirmPassword}
								       onChange={handleInputChange} />
							</label>
							<button type="submit">Reset Password</button>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default ResetPassword;