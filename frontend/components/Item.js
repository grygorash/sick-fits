import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import { CURRENT_USER_QUERY } from './User';

const Item = ({ item }) =>
	<ItemStyles>
		{item.image && <img src={item.image} alt={item.title} />}
		<Title>
			<Link href={{
				pathname: '/item',
				query: { id: item.id }
			}}><a>{item.title}</a></Link>
		</Title>
		<PriceTag>{formatMoney(item.price)}</PriceTag>
		<p>{item.description}</p>
		<Query query={CURRENT_USER_QUERY}>
			{({ data }) =>
				<div className="buttonList">
					{data.me && data.me.id === item.user.id &&
					<>
						<Link href={{
							pathname: 'update',
							query: { id: item.id }
						}}>
							<a>Edit</a>
						</Link>
						<DeleteItem id={item.id} />
					</>}
					{data.me.id === item.user.id ? null : <button>Add To Card</button>}
				</div>}
		</Query>
	</ItemStyles>;

Item.propTypes = {
	item: PropTypes.object.isRequired
};

export default Item;