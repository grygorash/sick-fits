import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART_MUTATION } from '../mutations';
import { CURRENT_USER_CART_QUERY } from '../queries';


const AddToCart = ({ id }) =>
	<Mutation mutation={ADD_TO_CART_MUTATION}
	          variables={{ id }}
	          refetchQueries={[{ query: CURRENT_USER_CART_QUERY }]}>
		{(addToCart, { loading }) =>
			<button disabled={loading}
			        onClick={addToCart}>
				Add{loading && 'ing'} to Cart
			</button>}
	</Mutation>;

AddToCart.propTypes = {
	id: PropTypes.string.isRequired
};

export default AddToCart;