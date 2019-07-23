import React from 'react';
import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';
import SignIn from './Signin';

const PleaseSignin = ({ children }) =>
	<Query query={CURRENT_USER_QUERY}>
		{({ data, loading }) =>
			loading ? <div>Loading</div> :
				!data.me ? <div>
					<p>Please Sign In before Continuing</p>
					<SignIn />
				</div> : children}
	</Query>;

export default PleaseSignin;