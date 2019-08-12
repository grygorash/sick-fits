import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import { Logo, StyledHeader } from './styles/StyledHeader';

Router.onRouteChangeStart = () => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => {
	NProgress.done();
};
Router.onRouteChangeError = () => {
	NProgress.done();
};

const Header = () =>
	<StyledHeader>
		<div className="bar">
			<Logo>
				<Link href="/">
					<a>Sale</a>
				</Link>
			</Logo>
			<Nav />
		</div>
		<div className="sub-bar">
			<Search />
		</div>
		<Cart />
	</StyledHeader>;


export default Header;