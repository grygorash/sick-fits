import React from 'react';
import { Query } from 'react-apollo';

import Error from './ErrorMessage';
import Table from './styles/Table';
import UserPermissions from './UserPermissions';
import { ALL_USERS_QUERY } from '../queries';

const possiblePermissions = [
	'ADMIN',
	'USER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE'
];

const Permissions = () =>
	<Query query={ALL_USERS_QUERY}>
		{({ data, error }) =>
			<>
				<Error error={error} />
				<h2>Manage Permissions</h2>
				<Table>
					<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						{possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
						<th>Update</th>
					</tr>
					</thead>
					<tbody>
					{data.users.map(user =>
						<UserPermissions
							key={user.id}
							user={user}
							possiblePermissions={possiblePermissions} />)}
					</tbody>
				</Table>
			</>}
	</Query>;

export default Permissions;