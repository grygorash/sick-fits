import React from 'react';
import { Query, Mutation } from 'react-apollo';

import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import { TOGGLE_CART_MUTATION } from '../mutations';
import { CURRENT_USER_CART_QUERY, LOCAL_STATE_QUERY } from '../queries';

const Cart = () =>
	<Query query={CURRENT_USER_CART_QUERY}>
		{({ data: { me } }) => me ?
			<Mutation mutation={TOGGLE_CART_MUTATION}>
				{toggleCart =>
					<Query query={LOCAL_STATE_QUERY}>
						{({ data: { cartOpen } }) =>
							<CartStyles open={cartOpen}>
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
										{me.cart.length ?
											<TakeMyMoney>
												<SickButton>Checkout</SickButton>
											</TakeMyMoney>
											: null}
									</footer>
								</header>
							</CartStyles>}
					</Query>}
			</Mutation>
			: null}
	</Query>;

export default Cart;