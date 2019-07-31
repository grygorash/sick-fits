import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { DELETE_ITEM_MUTATION } from '../mutations';
import { ALL_ITEMS_QUERY, PAGINATION_QUERY } from '../queries';
import { perPage } from '../config';

const DeleteItem = ({ router, id }) => {
	const page = router.query.page;
	const skip = page ? page * perPage - perPage : 0;

	return <Mutation
		mutation={DELETE_ITEM_MUTATION}
		variables={{ id }}
		refetchQueries={[{
			query: PAGINATION_QUERY
		}, {
			query: ALL_ITEMS_QUERY,
			variables: { first: perPage, skip }
		}, {
			query: ALL_ITEMS_QUERY,
			variables: { first: perPage, skip: skip + perPage }
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