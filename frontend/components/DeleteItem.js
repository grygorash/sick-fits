import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

import { DELETE_ITEM_MUTATION } from '../mutations';
import { CURRENT_USER_QUERY } from '../queries';

const DeleteItem = ({ router, id }) =>
	<Mutation
		mutation={DELETE_ITEM_MUTATION}
		variables={{ id }}
		refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
		{(deleteItem) =>
			<button onClick={async () => {
				confirm('Are you sure want to delete this item?') &&
				await deleteItem().then(() => router.push('/account-items'));
			}}>
				Delete Item
			</button>}
	</Mutation>;

DeleteItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default withRouter(DeleteItem);