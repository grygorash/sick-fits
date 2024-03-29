import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Mutation, Query } from 'react-apollo';

import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from '../mutations';
import { CURRENT_USER_CART_QUERY } from '../queries';

const Nav = ({ router }) =>
	<Query query={CURRENT_USER_CART_QUERY}>
		{({ data: { me } }) => (
			<NavStyles>
				<Link href="/items"><a className={router.pathname === '/items' ? 'active' : ''}>Shop</a></Link>
				<Link href="/sale"><a className={router.pathname === '/sale' ? 'active' : ''}>Sale</a></Link>
				{me && (<>
					<Link href="/sell"><a className={router.pathname === '/sell' ? 'active' : ''}>Sell</a></Link>
					<Link href="/orders"><a className={router.pathname === '/orders' ? 'active' : ''}>Orders</a></Link>
					<Link href="/account"><a className={router.pathname === '/me' ? 'active' : ''}>Account</a></Link>
					<Signout />
					<Mutation mutation={TOGGLE_CART_MUTATION}>
						{toggleCart =>
							<button onClick={toggleCart}>
								My Cart
								<CartCount count={me.cart.reduce((acc, cur) => acc + cur.quantity, 0)} />
							</button>}
					</Mutation>
				</>)}
				{!me && (<>
					<Link href="/signup"><a className={router.pathname === '/signup' ? 'active' : ''}>Sign Up</a></Link>
					<Link href="/signin"><a className={router.pathname === '/signin' ? 'active' : ''}>Sign In</a></Link>
				</>)}
			</NavStyles>
		)}
	</Query>;

export default withRouter(Nav);