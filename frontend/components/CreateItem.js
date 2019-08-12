import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import Router from 'next/router';
import Head from 'next/head';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CREATE_ITEM_MUTATION } from '../mutations';

class CreateItem extends Component {
	state = {
		item: {
			title: '',
			description: '',
			image: '',
			largeImage: '',
			price: ''
		}
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

	handleFormSubmit = async (e, createItem) => {
		e.preventDefault();
		const res = await createItem();
		Router.push({
			pathname: '/item',
			query: { id: res.data.createItem.id }
		}).then(() => this.props.client.resetStore());
	};

	render() {
		const { uploadFile, handleInputChange, handleFormSubmit } = this;
		const { item, loadingImage } = this.state;
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION}
			          variables={{ ...item, price: item.price === '' ? 0 : item.price }}>
				{(createItem, { loading, error }) => (
					<Form noValidate onSubmit={e => handleFormSubmit(e, createItem)}>
						<Head><title>Sale! Sell</title></Head>
						<h2>Sell an Item</h2>
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
							{item.image && <img src={item.image} alt="Upload preview" />}
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									value={item.title}
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
									value={item.price}
									placeholder="Price"
									onChange={handleInputChange}
									required
								/>
							</label>
							<label htmlFor="description">
								Description
								<textarea
									id="description"
									value={item.description}
									placeholder="Description"
									onChange={handleInputChange}
									required
								/>
							</label>
							<button type="submit">Creat{loading ? 'ing' : 'e'} Item</button>
						</fieldset>
					</Form>)}
			</Mutation>
		);
	}
}

export default withApollo(CreateItem);