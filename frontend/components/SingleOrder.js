import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
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
					<p>
						<span>OrderID: </span>
						<span>{id}</span>
					</p>
					<p>
						<span>Charge: </span>
						<span>{data.order.charge}</span>
					</p>
					<p>
						<span>Date: </span>
						<span>{format(new Date(data.order.createdAt), 'MMMM d, yyyy HH:mm')}</span>
					</p>
					<p>
						<span>Order Total: </span>
						<span>{formatMoney(data.order.total)}</span>
					</p>
					<p>
						<span>Item Count: </span>
						<span>{data.order.items.length}</span>
					</p>
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