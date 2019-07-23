import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';

const LOCAL_STATE_QUERY = gql`
    query{
        cartOpen @client
    }
`;

const TOGGLE_CART_MUTATION = gql`
    mutation{
        toggleCart @client
    }
`;

const Cart = () =>
	<Mutation mutation={TOGGLE_CART_MUTATION}>
		{(toggleCart) =>
			<Query query={LOCAL_STATE_QUERY}>
				{({ data }) =>
					<CartStyles open={data.cartOpen}>
						<header>
							<CloseButton title="close" onClick={toggleCart}>x</CloseButton>
							<Supreme>Your Cart</Supreme>
							<p>You Have __ Items in your cart</p>
							<footer>
								<p>$10</p>
								<SickButton>Checkout</SickButton>
							</footer>
						</header>
					</CartStyles>}
			</Query>}
	</Mutation>;

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };