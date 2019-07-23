import React from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items';
import { PAGINATION_QUERY } from './Pagination';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const DeleteItem = ({ id }) =>
	<Mutation
		mutation={DELETE_ITEM_MUTATION}
		variables={{ id }}
		refetchQueries={[{ query: ALL_ITEMS_QUERY }, { query: PAGINATION_QUERY }]}>
		{(deleteItem) => <button onClick={() => {
			confirm('Are you sure want to delete this item?') && deleteItem();
		}}>Delete Item</button>}
	</Mutation>;

DeleteItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default DeleteItem;