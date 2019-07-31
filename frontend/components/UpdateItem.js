import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from '../queries';
import { UPDATE_ITEM_MUTATION } from '../mutations';

class UpdateItem extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};

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
		const { id } = this.props;

		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
				{({ data, loading }) => {
					return loading ? <p>Loading...</p> :
						!data.item ? <p>No Item found for ID: {id}</p> : (
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
													defaultValue={data.item.title}
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
													defaultValue={data.item.price}
													placeholder="Price"
													onChange={handleInputChange}
													required
												/>
											</label>
											<label htmlFor="description">
												Description
												<textarea
													id="description"
													defaultValue={data.item.description}
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