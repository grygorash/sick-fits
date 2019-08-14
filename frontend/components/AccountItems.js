import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { format } from 'date-fns';

import OrderListStyles from './styles/OrderListStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';
import User from './User';

const AccountItems = () =>
	<User>
		{({ data: { me } }) => {
			return <>
				<Head><title>Sale! My Items</title></Head>
				<h2>You have {me.items.length} items</h2>
				<OrderListStyles>
					{me.items.map(item =>
						<OrderItemStyles key={item.id}>
							<Link href={{
								pathname: '/item',
								query: { id: item.id }
							}}>
								<a>
									<div className="order-meta">
										<p>Title: {item.title}</p>
										<p>Price: {formatMoney(item.price)}</p>
										<p>Created at: {format(new Date(item.createdAt), 'MMMM d, yyyy HH:mm')}</p>
									</div>
									<span className="images">
													<img key={item.id} src={item.image[0]} alt={item.title} />
									</span>
									<div className="order-meta">
										{item.description && <p>Description: {item.description}</p>}
									</div>
								</a>
							</Link>
						</OrderItemStyles>
					)}
				</OrderListStyles>
			</>;
		}}
	</User>;

export default AccountItems;