import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';

import { SIGNOUT_MUTATION } from '../mutations';

const Signout = ({ client }) =>
	<Mutation mutation={SIGNOUT_MUTATION}>
		{signout =>
			<button onClick={() => {
				NProgress.start();
				signout()
					.then(() => Router.push('/'))
					.then(() => client.resetStore());
			}}>
				Sign Out
			</button>}
	</Mutation>;


export default withApollo(Signout);