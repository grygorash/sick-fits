import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!){
        removeFromCart(id: $id){
            id
        }
    }
`;

const RemoveFromCart = ({ id }) =>
	<Mutation mutation={REMOVE_FROM_CART_MUTATION}
	          variables={{ id }}
	          refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{(removeFromCart, { loading }) =>
			<SickButton disabled={loading}
			            onClick={removeFromCart}>
				Remov{loading ? 'ing' : 'e'}
			</SickButton>}
	</Mutation>;

RemoveFromCart.propTypes = {
	id: PropTypes.string.isRequired
};

export default RemoveFromCart;