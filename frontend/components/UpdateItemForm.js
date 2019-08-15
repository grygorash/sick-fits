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
			image: PropTypes.array.isRequired
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
		for (let i in target.files) {
			if (target.files.hasOwnProperty(i)) {
				const { item } = this.state;
				const data = new FormData();
				data.append('file', target.files[i]);
				data.append('upload_preset', 'sale-shop');
				const res = await fetch(
					'https://api.cloudinary.com/v1_1/dlz9sdxba/image/upload',
					{ method: 'POST', body: data }
				);
				const file = await res.json();
				this.setState({
					item: {
						...item,
						image: [...item.image, file.secure_url],
						largeImage: [...item.largeImage, file.eager[0].secure_url]
					}
				});
			}
		}
		this.setState({
			loadingImage: false
		});
	};

	handleImageDelete = (e, i) => {
		const { item } = this.state;
		const getImages = path => path.filter((image, index) => index !== i);
		this.setState({
			item: {
				...item,
				image: getImages(item.image),
				largeImage: getImages(item.largeImage)
			}
		});
	};

	handleFormSubmit = async (e, updateItem) => {
		e.preventDefault();
		const res = await updateItem();
		Router.push({
			pathname: '/item',
			query: { id: res.data.updateItem.id }
		});
	};

	render() {
		const { handleInputChange, handleFormSubmit, uploadFile, handleImageDelete } = this;
		const { title, price, description, image } = this.state.item;
		const { loadingImage } = this.state;

		return (
			<Mutation
				mutation={UPDATE_ITEM_MUTATION}
				variables={{
					id: this.state.item.id,
					...this.state.item
				}}>
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
							{<div className="image-container">
								{image.map((img, i) =>
									<div key={i}>
										<button type="button" onClick={e => handleImageDelete(e, i)}>x</button>
										<img src={img} alt="Upload preview" />
									</div>
								)}
							</div>}
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