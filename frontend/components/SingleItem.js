import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import User from './User';
import DeleteItem from './DeleteItem';
import SingleItemStyles from './styles/SingleItemStyles';
import formatMoney from '../lib/formatMoney';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUEY($id: ID!){
        item(where: {id: $id}){
            id
            title
            description
            largeImage
            price
            user{
              id
            }
        }
    }
`;

const SingleItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
		{({ data: { item }, loading }) => {
			const { title, description, largeImage, price } = item;
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
									me && me.id === item.user.id &&
									<>
										<Link href={{
											pathname: 'update',
											query: { id }
										}}><a>Edit Item</a></Link>
										<DeleteItem id={item.id} />
									</>}
							</User>
						</div>
					</SingleItemStyles>;
		}}
	</Query>;

export default SingleItem;