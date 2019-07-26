import React from 'react';
import PropTypes from 'prop-types';

import CartItemStyles from './styles/CartItemStyles';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItem = ({ cartItem }) =>
	<CartItemStyles>
		<img src={cartItem.item.image} alt={cartItem.item.title} />
		<div className="cart-item-details">
			<h3>{cartItem.item.title}</h3>
			<p>
				{formatMoney(cartItem.item.price * cartItem.quantity)} - {cartItem.quantity} pcs.
				                                                       * {formatMoney(cartItem.item.price)} each
			</p>
			<RemoveFromCart id={cartItem.id} />
		</div>
	</CartItemStyles>;


CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired
};

export default CartItem;