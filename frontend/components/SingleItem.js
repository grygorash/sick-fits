import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import User from './User';
import DeleteItem from './DeleteItem';
import SingleItemStyles from './styles/SingleItemStyles';
import { SINGLE_ITEM_QUERY } from '../queries';
import formatMoney from '../lib/formatMoney';

const SingleItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY}
	       variables={{ id }}>
		{({ data: { item }, loading }) => {
			const { title, description, largeImage, price, user, id } = item;
			return !item ? <p>No Item found for ID: {id}</p> :
				loading ? <p>Loading</p> :
					<SingleItemStyles>
						<Head>
							<title>Sick Fits! {title}</title>
						</Head>
						<img src={largeImage} alt={title} />
						<div className="details">
							<h2>Viewing {title}</h2>
							<p>{description}</p>
							<p className="price">{formatMoney(price)}</p>
							<User>
								{({ data: { me } }) =>
									me && me.id === user.id &&
									<>
										<Link href={{
											pathname: 'update',
											query: { id }
										}}><a>Edit Item</a></Link>
										<DeleteItem id={id} />
									</>}
							</User>
						</div>
					</SingleItemStyles>;
		}}
	</Query>;

SingleItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default SingleItem;