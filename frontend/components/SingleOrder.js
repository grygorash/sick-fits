import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';

import Error from './ErrorMessage';
import { SINGLE_ORDER_QUERY } from '../queries';
import OrderStyles from './styles/OrderStyles';
import formatMoney from '../lib/formatMoney';

const SingleOrder = ({ id }) =>
	<Query query={SINGLE_ORDER_QUERY}
	       variables={{ id }}>
		{({ data, error, loading }) => {
			const { order } = data;
			return error ? <Error error={error} /> :
				loading ? <div>Loading...</div> :
					<OrderStyles>
						<Head>
							<title>Sick Fits - Order {order.id}</title>
						</Head>
						<p>
							<span>OrderID: </span>
							<span>{id}</span>
						</p>
						<p>
							<span>Charge: </span>
							<span>{order.charge}</span>
						</p>
						<p>
							<span>Date: </span>
							<span>{order.createdAt}</span>
						</p>
						<p>
							<span>Order Total: </span>
							<span>{formatMoney(order.total)}</span>
						</p>
						<p>
							<span>Item Count: </span>
							<span>{order.items.length}</span>
						</p>
						<div className="items">
							{order.items.map(item =>
								<div key={item.id} className="order-item">
									<img src={item.image} alt={item.title} />
									<div className="item-details">
										<h2>{item.title}</h2>
										<p>Qty: {item.quantity}</p>
										<p>Each: {formatMoney(item.price)}</p>
										<p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
										{item.description && <p>Description: {item.description}</p>}
									</div>
								</div>)}
						</div>
					</OrderStyles>;
		}}
	</Query>;


SingleOrder.propTypes = {
	id: PropTypes.string.isRequired
};

export default SingleOrder;