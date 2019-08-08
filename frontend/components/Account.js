import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';

import { ACCOUNT_ITEMS_QUERY } from '../queries';
import User from './User';
import OrderListStyles from './styles/OrderListStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import { format } from 'date-fns';
import formatMoney from '../lib/formatMoney';

const Account = () =>
	<User>
		{({ data: { me } }) =>
			<Query query={ACCOUNT_ITEMS_QUERY} variables={{ id: me.id, account: true }}>
				{({ data: { items } }) =>
					<>
						<h2>You have {items.length} items</h2>
						<OrderListStyles>
							{items.map(item =>
								<OrderItemStyles key={item.id}>
									<Link href={{
										pathname: '/item',
										query: { id: item.id }
									}}>
										<a>
											<div className="order-meta">
												<p>Title: {item.title}</p>
												{item.description && <p>Description: {item.description}</p>}
												<p>Price: {formatMoney(item.price)}</p>
												<p>Created at: {format(new Date(item.createdAt), 'MMMM d, yyyy HH:MM')}</p>
											</div>
											<span className="images">
													<img key={item.id} src={item.image} alt={item.title} />
											</span>
										</a>
									</Link>
								</OrderItemStyles>
							)}
						</OrderListStyles>
					</>}
			</Query>}
	</User>;

export default Account;