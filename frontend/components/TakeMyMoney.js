import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import NProgress from 'nprogress';

import User from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { Mutation } from 'react-apollo';
import { CREATE_ORDER_MUTATION, TOGGLE_CART_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY, USER_ORDERS_QUERY } from '../queries';

const TakeMyMoney = props => {
	const handleTotalItems = cart =>
		cart.reduce((tally, cartItem) =>
			tally + cartItem.quantity, 0);

	const handleToken = async (res, createOrder, toggleCart) => {
		NProgress.start();
		// manually call the mutation once we have the stripe token
		const order = await createOrder({
			variables: {
				token: res.id
			}
		});
		toggleCart();
		Router.push({
			pathname: '/orders',
			query: { id: order.data.createOrder.id }
		});
	};

	return (
		<User>
			{({ data: { me } }) =>
				<Mutation mutation={CREATE_ORDER_MUTATION}
				          refetchQueries={[{ query: CURRENT_USER_QUERY }, { query: USER_ORDERS_QUERY }]}>
					{createOrder => me &&
						<Mutation mutation={TOGGLE_CART_MUTATION}>
							{toggleCart =>
								<StripeCheckout amount={calcTotalPrice(me.cart)}
								                name="Sick Fits"
								                description={`Order of ${handleTotalItems(me.cart)} items`}
								                image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
								                stripeKey="pk_test_41sYlVTsb3GrQmzknY0kA0xr003z6kSvF9"
								                currency="USD"
								                email={me.email}
								                token={res => handleToken(res, createOrder, toggleCart)}>
									{props.children}
								</StripeCheckout>}
						</Mutation>}
				</Mutation>}
		</User>
	);
};

export default TakeMyMoney;