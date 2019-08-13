import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import User from './User';
import AccountStyles from './styles/AccountStyles';

const Account = () =>
	<User>
		{({ data: { me } }) =>
			<AccountStyles>
				<Head><title>Sale! Account</title></Head>
				<div className="user-info">
					<img src={me.logo}
					     alt="user image"
					     className="logo-user" />
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
					<Link href="/account-items">
						<a>Show Items</a>
					</Link>
				</div>
				{me.permissions.includes('ADMIN') &&
				<div className="user-permissions">
					<Link href="/permissions"><a>
						Show permissions
					</a></Link>
				</div>}
			</AccountStyles>}
	</User>;


export default Account;