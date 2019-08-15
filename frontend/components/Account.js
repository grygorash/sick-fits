import React from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';

import User from './User';
import AccountStyles from './styles/AccountStyles';
import { DELETE_USER_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY } from '../queries';

const Account = ({ router }) =>
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
						}}>
							<a>Edit Profile</a>
						</Link>
						<Link href="/email-request-reset">
							<a>Change Email</a>
						</Link>
						<Link href="/password-request-reset">
							<a>Change Password</a>
						</Link>
					</div>
				</div>
				<div className="user-items">
					<p>You have {me.items.length} Item{me.items.length === 1 ? '' : 's'}</p>
					{me.items.length ?
						<Link href="/account-items">
							<a>Show Items</a>
						</Link> : null}
				</div>
				{me.permissions.includes('ADMIN') &&
				<div className="user-permissions">
					<Link href="/permissions">
						<a>Show permissions</a>
					</Link>
				</div>}
				<div className="user-delete">
					<Mutation mutation={DELETE_USER_MUTATION}
					          variables={{ id: me.id }}
					          refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
						{deleteUser =>
							<button onClick={async () => {
								confirm('Are you sure want to delete Account') &&
								await deleteUser().then(() => router.push('/items'));
							}}>Delete Account
							</button>}
					</Mutation>
				</div>
			</AccountStyles>}
	</User>;


export default withRouter(Account);