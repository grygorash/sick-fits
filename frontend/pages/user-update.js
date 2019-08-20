import React from 'react';
import { Query } from 'react-apollo';

import PleaseSignin from '../components/PleaseSignin';
import UserUpdate from '../components/UserUpdate';
import { CURRENT_USER_ACCOUNT_QUERY } from '../queries';

const UpdateUser = () =>
	<PleaseSignin>
		<Query query={CURRENT_USER_ACCOUNT_QUERY}>
			{({ data: { me } }) =>
				<UserUpdate user={me} />}
		</Query>
	</PleaseSignin>;

export default UpdateUser;