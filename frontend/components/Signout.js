import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import Router from 'next/router';

import { SIGN_OUT_MUTATION } from '../mutations';

const Signout = ({ client }) => {

		return <Mutation mutation={SIGN_OUT_MUTATION}>
			{(signout =>
				<button onClick={() => {
					signout()
						.then(() => client.resetStore())
						.then(() => Router.push('/items'));
				}}>
					Sign Out
				</button>)}
		</Mutation>;
	}
;

export default withApollo(Signout);