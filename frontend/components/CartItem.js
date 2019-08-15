import React from 'react';
import PropTypes from 'prop-types';

import CartItemStyles from './styles/CartItemStyles';
import RemoveFromCart from './RemoveFromCart';
import formatMoney from '../lib/formatMoney';

const CartItem = ({ cartItem }) =>
	cartItem.item ?
		<CartItemStyles>
			<img src={cartItem.item.image[0]} alt={cartItem.item.title} />
			<div className="cart-item-details">
				<h3>{cartItem.item.title}</h3>
				<p>
					{formatMoney(cartItem.item.price * cartItem.quantity)} - {cartItem.quantity} pcs.
					                                                       * {formatMoney(cartItem.item.price)} each
				</p>
				<RemoveFromCart id={cartItem.id} />
			</div>
		</CartItemStyles> :
		<CartItemStyles>
			<img src="http://files.soprema.ca//2017-05-29/not-available.png592c6724745ea684943ac22e5642b6c8c461033007ad0.png"
			     alt="" />
			<div className="cart-item-details">
				<h3>This Item was deleted by owner</h3>
				<RemoveFromCart id={cartItem.id} />
			</div>
		</CartItemStyles>;


CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired
};

export default CartItem;