import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION{
        signout{
            message
        }
    }
`;

const Signout = () =>
	<Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{(signout => <button onClick={() => {
			signout();
			Router.push('/items');
		}}>Sign Out</button>)}
	</Mutation>;

export default Signout;