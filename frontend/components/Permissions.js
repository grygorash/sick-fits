import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from './ErrorMessage';
import Table from './styles/Table';
import UserPermissions from './UserPermissions';

const possiblePermissions = [
	'ADMIN',
	'USER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE'
];

const ALL_USERS_QUERY = gql`
    query ALL_USERS_QUERY{
        users{
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = props =>
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
						<UserPermissions key={user.id}
						                 user={user}
						                 possiblePermissions={possiblePermissions} />)}
					</tbody>
				</Table>
			</>}
	</Query>;

export default Permissions;