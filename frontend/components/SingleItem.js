import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { Carousel } from 'react-responsive-carousel';

import DeleteItem from './DeleteItem';
import SingleItemStyles from './styles/SingleItemStyles';
import CarouselStyles from './styles/CarouselStyles';
import { CURRENT_USER_ID_QUERY, SINGLE_ITEM_QUERY } from '../queries';
import formatMoney from '../lib/formatMoney';
import ErrorPage from './ErrorPage';
import AddToCart from './AddToCart';

const SingleItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY}
	       variables={{ id }}>
		{({ data }) => {
			return data && Object.keys(data).length !== 0 ?
				<SingleItemStyles>
					<Head>
						<title>Sale! {data.item.title}</title>
					</Head>
					<CarouselStyles>
						<Carousel showArrows emulateTouch swipeable>
							{data.item.largeImage.map((img, i) => <img key={i} src={img} alt={data.item.title} />)}
						</Carousel>
					</CarouselStyles>
					<div className="details">
						<h3>Viewing: <span>{data.item.title}</span></h3>
						<p>Description: <span>{data.item.description}</span></p>
						<p>Created at: <span>{format(new Date(data.item.createdAt), 'MMMM d, yyyy HH:mm')}</span></p>
						<p>Seller: <span>
							<Link href={{
								pathname: '/user',
								query: { id: data.item.user.id }
							}}><a>{data.item.user.name}</a>
							</Link>
						</span></p>
						<p className={data.item.discountPrice !== null ? 'price crossed' : 'price'}>
							Price: <span>{formatMoney(data.item.price)}</span>
							{data.item.discountPrice !== null && <span>{formatMoney(data.item.discountPrice)}</span>}
						</p>
						<Query query={CURRENT_USER_ID_QUERY}>
							{({ data: { me } }) =>
								<>
									{me && me.id === data.item.user.id &&
									<>
										<Link href={{ pathname: '/update', query: { id } }}>
											<a>Edit Item</a>
										</Link>
										<DeleteItem id={id} />
									</>}
									{me && me.id !== data.item.user.id && <AddToCart id={id} />}
								</>}
						</Query>
					</div>
				</SingleItemStyles> :
				<ErrorPage status="404" text={`No item found for ID: ${id}`} />;
		}}
	</Query>;

SingleItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default SingleItem;