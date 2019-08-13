import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { format } from 'date-fns';

import { SINGLE_USER_QUERY } from '../queries';
import SingleUserStyles from './styles/SingleUserStyles';
import formatMoney from '../lib/formatMoney';
import ErrorPage from './ErrorPage';

const SingleUser = ({ id }) =>
	<Query query={SINGLE_USER_QUERY}
	       variables={{ id }}>
		{({ data }) =>
			data && Object.keys(data).length !== 0 ?
				<SingleUserStyles>
					<div className="user-info">
						<img src={data.user.logo} alt={data.user.name} />
						<p>Seller: <span>{data.user.name}</span></p>
					</div>
					<div className="user-items">
						<h2><span>{data.user.name} has {data.user.items.length} Item{data.user.items.length === 1 ? '' : 's'}</span>
						</h2>
						{data.user.items.map(item =>
							<Link key={item.id}
							      href={{
								      pathname: '/item',
								      query: { id: item.id }
							      }}>
								<a>
									<img src={item.image} alt={item.title} />
									<p>Title: {item.title}</p>
									<p>Price: {formatMoney(item.price)}</p>
									<p>Created At: {format(new Date(item.createdAt), 'MMMM d, yyyy HH:MM')}</p>
								</a>
							</Link>
						)}
					</div>
				</SingleUserStyles> :
				<ErrorPage status="404" text={`No user found for ID: ${id}`} />}
	</Query>;

export default SingleUser;