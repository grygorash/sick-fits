import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const DeleteItem = props => {
	const update = (cache, payload) => {
		// manually update the cache on the client, so it matches the server
		// read the cache for the items we want
		const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
		// filter the deleted item out of the page
		data.getItems = data.getItems.filter(item => item.id !== payload.data.deleteItem.id);
		// put the items back
		cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
	};

	return (
		<Mutation
			mutation={DELETE_ITEM_MUTATION}
			variables={{ id: props.id }}
			update={update}>
			{(deleteItem, { error }) => (
				<button onClick={() => {
					confirm('Are you sure want to delete this item?') && deleteItem();
				}}>Delete Item</button>
			)}
		</Mutation>
	);
};

export default DeleteItem;