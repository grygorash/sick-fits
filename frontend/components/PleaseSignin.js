import React from 'react';
import { Query } from 'react-apollo';

import SignIn from './Signin';
import { CURRENT_USER_ID_QUERY } from '../queries';

const PleaseSignin = ({ children }) =>
	<Query query={CURRENT_USER_ID_QUERY}>
		{({ data, loading }) =>
			loading ? <div>Loading</div> :
				!data.me ? <div>
					<p>Please Sign In before Continuing</p>
					<SignIn />
				</div> : children}
	</Query>;

export default PleaseSignin;