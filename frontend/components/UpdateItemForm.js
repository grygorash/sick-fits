import React, { Component } from 'react';
import Router from 'next/dist/lib/router';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { UPDATE_ITEM_MUTATION } from '../mutations';

class UpdateItemForm extends Component {
	static propTypes = {
		item: PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			description: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired
		})
	};

	state = {
		item: {
			id: this.props.item.id,
			title: this.props.item.title,
			price: this.props.item.price,
			description: this.props.item.description,
			image: this.props.item.image,
			largeImage: this.props.item.largeImage
		},
		loadingImage: false
	};

	handleInputChange = ({ target }) => {
		const val = target.type === 'number' ? +target.value : target.value;
		this.setState({ item: { ...this.state.item, [target.id]: val } });
	};

	uploadFile = async ({ target }) => {
		this.setState({ loadingImage: true });
		const data = new FormData();
		data.append('file', target.files[0]);
		data.append('upload_preset', 'sale-shop');
		const res = await fetch('https://api.cloudinary.com/v1_1/dlz9sdxba/image/upload', { method: 'POST', body: data });
		const file = await res.json();
		this.setState({
			item: { ...this.state.item, image: file.secure_url, largeImage: file.eager[0].secure_url },
			loadingImage: false
		});
	};

	handleFormSubmit = async (e, updateItem) => {
		e.preventDefault();
		const res = await updateItem({
			variables: {
				id: this.state.item.id,
				...this.state.item
			}
		});
		Router.push({
			pathname: '/item',
			query: { id: res.data.updateItem.id }
		});
	};

	render() {
		const { handleInputChange, handleFormSubmit, uploadFile } = this;
		const { title, price, description, image } = this.state.item;
		const { loadingImage } = this.state;
		return (
			<Mutation
				mutation={UPDATE_ITEM_MUTATION}
				variables={this.state}>
				{(updateItem, { error, loading }) =>
					<Form noValidate onSubmit={e => handleFormSubmit(e, updateItem)}>
						<h2>Update an Item</h2>
						<Error error={error} />
						<fieldset disabled={loading || loadingImage} aria-busy={loading || loadingImage}>
							<label htmlFor="file">
								Image
								<input
									type="file"
									id="file"
									placeholder="Upload an Image"
									onChange={uploadFile}
									required
								/>
							</label>
							{image && <img src={image} alt="Upload preview" />}
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