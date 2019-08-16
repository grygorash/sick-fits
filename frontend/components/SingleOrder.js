import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';

import { SINGLE_ORDER_QUERY } from '../queries';
import OrderStyles from './styles/OrderStyles';
import formatMoney from '../lib/formatMoney';
import ErrorPage from './ErrorPage';

const SingleOrder = ({ id }) =>
	<Query query={SINGLE_ORDER_QUERY}
	       variables={{ id }}>
		{({ data }) =>
			data && Object.keys(data).length !== 0 ?
				<OrderStyles>
					<Head>
						<title>Sale! Order {data.order.id}</title>
					</Head>
					<p>OrderID: <span>{id}</span></p>
					<p>Charge: <span>{data.order.charge}</span></p>
					<p>Date: <span>{format(new Date(data.order.createdAt), 'MMMM d, yyyy HH:mm')}</span></p>
					<p> Order Total: <span>{formatMoney(data.order.total)}</span></p>
					<p>Item Count: <span>{data.order.items.length}</span></p>
					<div className="items">
						{data.order.items.map(item =>
							<div key={item.id} className="order-item">
								<img src={item.image[0]} alt={item.title} />
								<div className="item-details">
									<h2>{item.title}</h2>
									<p>Qty: {item.quantity}</p>
									<p>Each: {formatMoney(item.price)}</p>
									<p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
									{item.description && <p>Description: {item.description}</p>}
									<p>Seller: <span>
											<Link href={{
												pathname: '/user',
												query: { id: item.user.id }
											}}><a>{item.user.name}</a>
											</Link></span>
									</p>
									<p><Link href={{
										pathname: '/feedback',
										query: { id: item.user.id }
									}}><a>Leave Feedback</a></Link>
									</p>
								</div>
							</div>)}
					</div>
				</OrderStyles> :
				<ErrorPage status="404" text={`No order found for ID: ${id}`} />}
	</Query>;

SingleOrder.propTypes = {
	id: PropTypes.string.isRequired
};

export default SingleOrder;