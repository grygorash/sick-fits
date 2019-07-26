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
		{item.image && <img src={item.image} alt={item.title} />}
		<Title>
			<Link href={{
				pathname: '/item',
				query: { id: item.id }
			}}><a>{item.title}</a></Link>
		</Title>
		<PriceTag>{formatMoney(item.price)}</PriceTag>
		<p>{item.description}</p>
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
	item: PropTypes.object.isRequired
};

export default Item;