import React from 'react';
import { Query, Mutation } from 'react-apollo';

import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import { TOGGLE_CART_MUTATION } from '../mutations';
import { LOCAL_STATE_QUERY } from '../queries';

const Cart = () =>
	<User>
		{({ data: { me } }) => me ?
			<Mutation mutation={TOGGLE_CART_MUTATION}>
				{toggleCart =>
					<Query query={LOCAL_STATE_QUERY}>
						{({ data }) =>
							<CartStyles open={data.cartOpen}>
								<header>
									<CloseButton onClick={toggleCart}>x</CloseButton>
									<Supreme>{me.name}'s Cart</Supreme>
									<p>You Have {me.cart.length} Item{me.cart.length > 1 ? 's' : ''} in your cart</p>
									<ul>
										{me.cart.map(cartItem =>
											<CartItem key={cartItem.id} cartItem={cartItem} />)}
									</ul>
									<footer>
										<p>{formatMoney(calcTotalPrice(me.cart))}</p>
										<SickButton>Checkout</SickButton>
									</footer>
								</header>
							</CartStyles>}
					</Query>}
			</Mutation>
			: null}
	</User>;

export default Cart;