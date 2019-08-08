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
import ErrorPage from './ErrorPage';

const SingleItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY}
	       variables={{ id }}>
		{({ data }) =>
			data && Object.keys(data).length !== 0 ?
				<SingleItemStyles>
					<Head>
						<title>Sick Fits! {data.item.title}</title>
					</Head>
					<img src={data.item.largeImage} alt={data.item.title} />
					<div className="details">
						<h2>Viewing {data.item.title}</h2>
						<p>{data.item.description}</p>
						<p className="price">{formatMoney(data.item.price)}</p>
						<User>
							{({ data: { me } }) =>
								me && me.id === data.item.user.id &&
								<>
									<Link href={{
										pathname: '/update',
										query: { id }
									}}><a>Edit Item</a></Link>
									<DeleteItem id={id} />
								</>}
						</User>
					</div>
				</SingleItemStyles> :
				<ErrorPage status="404" text={`No item found for ID: ${id}`} />}
	</Query>;

SingleItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default SingleItem;