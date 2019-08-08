import React, { Component } from 'react';
import Router from 'next/dist/lib/router';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { UPDATE_ITEM_MUTATION } from '../mutations';

class UpdateItemForm extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};

	state = {
		title: this.props.item.title,
		price: this.props.item.price,
		description: this.props.item.description
	};

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
		const { title, price, description } = this.state;

		return (
			<Mutation
				mutation={UPDATE_ITEM_MUTATION}
				variables={this.state}>
				{(updateItem, { error, loading }) =>
					<Form noValidate onSubmit={e => handleFormSubmit(e, updateItem)}>
						<h2>Update an Item</h2>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									defaultValue={title}
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
									defaultValue={price}
									placeholder="Price"
									onChange={handleInputChange}
									required
								/>
							</label>
							<label htmlFor="description">
								Description
								<textarea
									id="description"
									defaultValue={description}
									placeholder="Description"
									onChange={handleInputChange}
									required
								/>
							</label>
							<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
						</fieldset>
					</Form>}
			</Mutation>
		);
	}
}

export default UpdateItemForm;