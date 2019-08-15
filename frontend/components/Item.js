import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import User from './User';

const Item = ({ item }) =>
	<ItemStyles>
		<Link href={{
			pathname: '/item',
			query: { id: item.id }
		}}><a>
			{<img src={item.image[0]} alt={item.title} />}
			<Title><p>{item.title}</p></Title>
			<PriceTag>{formatMoney(item.price)}</PriceTag>
			<p>{item.description}</p>
		</a></Link>
		<User>
			{({ data: { me } }) => me &&
				<div className="buttonList">
					{me.id === item.user.id &&
					<>
						<Link href={{ pathname: 'update', query: { id: item.id } }}>
							<a>Edit</a>
						</Link>
						<DeleteItem id={item.id} />
					</>}
					{me.id !== item.user.id &&
					<AddToCart id={item.id} />}
				</div>}
		</User>
	</ItemStyles>;


Item.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		image: PropTypes.array.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		user: PropTypes.shape({
			id: PropTypes.string.isRequired
		})
	})
};

export default Item;