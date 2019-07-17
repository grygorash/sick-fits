import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID){
        getItem(where: {id: $id}){
            id
            title
            description
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int){
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ){
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
	state = {};

	handleInputChange = ({ target }) => {
		const val = target.type === 'number' ? +target.value : target.value;
		this.setState({ [target.id]: val });
	};

	handleFormSubmit = async (e, updateItem) => {
		e.preventDefault();
		const res = await updateItem({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		Router.push({
			pathname: '/item',
			query: { id: res.data.updateItem.id }
		});
	};

	render() {
		const { handleInputChange, handleFormSubmit } = this;
		const { title, description, price } = this.state;

		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					return loading ? <p>Loading...</p> :
						!data.getItem ? <p>No Item found for ID: {this.props.id}</p> : (
							<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
								{(updateItem, { loading, error }) => (
									<Form noValidate onSubmit={e => handleFormSubmit(e, updateItem)}>
										<h2>Update an Item</h2>
										<Error error={error} />
										<fieldset disabled={loading} aria-busy={loading}>
											<label htmlFor="title">
												Title
												<input
													type="text"
													id="title"
													defaultValue={data.getItem.title}
													placeholder="Title"
													onChange={handleInputChange}
													required
												/>
											</label>
											<label htmlFor="price">
												Price
												<input
													type="number"
													id="price"
													defaultValue={data.getItem.price}
													placeholder="Price"
													onChange={handleInputChange}
													required
												/>
											</label>
											<label htmlFor="description">
												Description
												<textarea
													id="description"
													defaultValue={data.getItem.description}
													placeholder="Description"
													onChange={handleInputChange}
													required
												/>
											</label>
											<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
										</fieldset>
									</Form>
								)}
							</Mutation>
						);
				}}
			</Query>
		);
	}
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };