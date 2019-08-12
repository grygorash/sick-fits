import React from 'react';
import Query from 'react-apollo/Query';
import Link from 'next/link';
import Head from 'next/head';

import Error from './ErrorMessage';
import { USER_ORDERS_QUERY } from '../queries';
import OrderListStyles from './styles/OrderListStyles';
import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';
import { format } from 'date-fns';

const OrderList = () =>
	<Query query={USER_ORDERS_QUERY}>
		{({ data: { orders }, loading, error }) =>
			loading ? <div>Loading...</div> :
				error ? <Error error={error} /> :
					<>
						<Head><title>Sale! Orders</title></Head>
						<h2>You have {orders.length} orders</h2>
						<OrderListStyles>
							{orders.map(order =>
								<OrderItemStyles key={order.id}>
									<Link href={{
										pathname: '/order',
										query: { id: order.id }
									}}>
										<a>
											<div className="order-meta">
												<p>Items: {order.items.reduce((a, b) => a + b.quantity, 0)}</p>
												<p>Products: {order.items.length}</p>
												<p>Create at: {format(new Date(order.createdAt), 'MMMM d, yyyy HH:MM')}</p>
												<p>Total: {formatMoney(order.total)}</p>
											</div>
											<span className="images">
												{order.items.map(item =>
													<img key={item.id} src={item.image} alt={item.title} />)}
											</span>
										</a>
									</Link>
								</OrderItemStyles>
							)}
						</OrderListStyles>
					</>}
	</Query>;

export default OrderList;