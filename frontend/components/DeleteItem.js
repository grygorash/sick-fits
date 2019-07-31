import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { DELETE_ITEM_MUTATION } from '../mutations';
import { ALL_ITEMS_QUERY, PAGINATION_QUERY } from '../queries';

const DeleteItem = (props) => {
	const page = props.router.query.page;

	return <Mutation
		mutation={DELETE_ITEM_MUTATION}
		variables={{ id: props.id }}
		refetchQueries={[{ query: PAGINATION_QUERY }, {
			query: ALL_ITEMS_QUERY,
			variables: { first: 4, skip: page ? page * 4 - 4 : 0 }
		}]}>
		{(deleteItem) => {
			return <button onClick={() => {
				confirm('Are you sure want to delete this item?') && deleteItem();
			}}>
				Delete Item
			</button>;
		}}
	</Mutation>;
};

DeleteItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default withRouter(DeleteItem);