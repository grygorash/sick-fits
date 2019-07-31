import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import { SIGN_OUT_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY } from '../queries';

const Signout = () =>
	<Mutation mutation={SIGN_OUT_MUTATION}
	          refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{(signout =>
			<button onClick={() => {
				signout();
				Router.push('/items');
			}}>
				Sign Out
			</button>)}
	</Mutation>;

export default Signout;