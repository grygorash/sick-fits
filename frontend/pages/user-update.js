import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import UserUpdate from '../components/UserUpdate';
import User from '../components/User';

const UpdateUser = () =>
	<PleaseSignin>
		<User>
			{({ data: { me } }) =>
				<UserUpdate user={me} />}
		</User>
	</PleaseSignin>;

export default UpdateUser;