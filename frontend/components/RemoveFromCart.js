import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import SickButton from './styles/SickButton';
import { REMOVE_FROM_CART_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY } from '../queries';

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