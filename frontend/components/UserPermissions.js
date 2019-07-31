import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import SickButton from './styles/SickButton';
import { UPDATE_PERMISSIONS_MUTATION } from '../mutations';

class UserPermissions extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string,
			email: PropTypes.string,
			id: PropTypes.string,
			permissions: PropTypes.array
		}).isRequired,
		possiblePermissions: PropTypes.array.isRequired
	};

	state = { permissions: this.props.user.permissions };

	handleInputChange = ({ target }) => {
		const permissions = this.state;
		target.checked ?
			this.setState({
				permissions: [...permissions, target.value]
			}) :
			this.setState({
				permissions: permissions.filter(permission => permission !== target.value)
			});
	};

	render() {
		const { handleInputChange } = this;
		const { permissions } = this.state;
		const { user, possiblePermissions } = this.props;

		return (
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				{possiblePermissions.map(permission =>
					<td key={permission}>
						<label htmlFor={`${user.id}-permission-${permission}`}>
							<input type="checkbox"
							       id={`${user.id}-permission-${permission}`}
							       value={permission}
							       checked={permissions.includes(permission)}
							       onChange={handleInputChange} />
						</label>
					</td>)}
				<td>
					<Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ permissions, userId: user.id }}>
						{(updatePermissions, { loading }) =>
							<SickButton type="button"
							            disabled={loading}
							            onClick={updatePermissions}>
								Updat{loading ? 'ing' : 'e'}
							</SickButton>}
					</Mutation>
				</td>
			</tr>
		);
	}
}

export default UserPermissions;