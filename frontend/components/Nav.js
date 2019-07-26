import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Mutation } from 'react-apollo';

import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Cart';
import CartCount from './CartCount';

const Nav = ({ router }) =>
	<User>
		{({ data: { me } }) => (
			<NavStyles>
				<Link href="/items"><a className={router.pathname === '/items' ? 'active' : ''}>Shop</a></Link>
				{me && (<>
					<Link href="/sell"><a className={router.pathname === '/sell' ? 'active' : ''}>Sell</a></Link>
					<Link href="/orders"><a className={router.pathname === '/orders' ? 'active' : ''}>Orders</a></Link>
					<Link href="/me"><a className={router.pathname === '/me' ? 'active' : ''}>Account</a></Link>
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
	</User>;

export default withRouter(Nav);