import React from 'react';
import Link from 'next/link';

import User from './User';
import AccountStyles from './styles/AccountStyles';

const Account = () =>
	<User>
		{({ data: { me } }) => {
			return <AccountStyles>
				<div className="user-info">
					<img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
					     alt="user image" />
					<div>
						<p>Name: {me.name}</p>
						<p>Email: {me.email}</p>
						<Link href={{
							pathname: '/user-update',
							query: { id: me.id }
						}}><a>Edit Profile</a></Link>
					</div>
				</div>
				<div className="user-items">
					<p>You have {me.items.length} Item{me.items.length === 1 ? '' : 's'}</p>
					<Link href="account-items"><a>
						Show Items
					</a></Link>
				</div>


			</AccountStyles>;
		}}
	</User>;


export default Account;