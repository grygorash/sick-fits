import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Item from './Item';
import Error from './ErrorMessage';
import Pagination from './Pagination';
import { Center, ItemsList } from './styles/ItemsList';
import { perPage } from '../config';
import { ALL_ITEMS_QUERY } from '../queries';

const ItemList = ({ page }) =>
	<Center>
		<Pagination page={page} />
		<Query query={ALL_ITEMS_QUERY}
		       variables={{ skip: page * perPage - perPage }}>
			{({ error, data }) =>
				error ? <Error error={error} /> :
					<ItemsList>
						{data.items.map(item =>
							<Item key={item.id} item={item} />)}
					</ItemsList>}
		</Query>
		<Pagination page={page} />
	</Center>;

ItemList.propTypes = {
	page: PropTypes.number.isRequired
};

export default ItemList;