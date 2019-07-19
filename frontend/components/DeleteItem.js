import React from 'react';
import { Mutation } from 'react-apollo';
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

const DeleteItem = props =>
	<Mutation
		mutation={DELETE_ITEM_MUTATION}
		variables={{ id: props.id }}
		refetchQueries={[{ query: ALL_ITEMS_QUERY }, { query: PAGINATION_QUERY }]}
	>
		{(deleteItem) => (
			<button onClick={() => {
				confirm('Are you sure want to delete this item?') && deleteItem();
			}}>Delete Item</button>
		)}
	</Mutation>;

// const update = (cache, payload) => {
// 	// manually update the cache on the client, so it matches the server
// 	// read the cache for the items we want
// 	const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
// 	data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
// 	// put the items back
// 	cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
// };

export default DeleteItem;