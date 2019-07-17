import Link from 'next/link';
import { withRouter } from 'next/router';

import NavStyles from './styles/NavStyles';

const Nav = ({ router }) =>
	<NavStyles>
		<Link href="/items"><a className={router.pathname === '/items' ? 'active' : ''}>Shop</a></Link>
		<Link href="/sell"><a className={router.pathname === '/sell' ? 'active' : ''}>Sell</a></Link>
		<Link href="/signup"><a className={router.pathname === '/signup' ? 'active' : ''}>Signup</a></Link>
		<Link href="/orders"><a className={router.pathname === '/orders' ? 'active' : ''}>Orders</a></Link>
		<Link href="/me"><a className={router.pathname === '/me' ? 'active' : ''}>Account</a></Link>
	</NavStyles>;

export default withRouter(Nav);