import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import UserUpdate from '../components/UserUpdate';

const UpdateUser = ({ query }) =>
	<PleaseSignin>
		<UserUpdate id={query.id} />
	</PleaseSignin>;

export default UpdateUser;