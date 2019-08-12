import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Form from './styles/Form';
import { UPDATE_USER_MUTATION } from '../mutations';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../queries';

class UserUpdate extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string.isRequired,
			logo: PropTypes.string.isRequired
		})
	};

	state = {
		name: this.props.user.name,
		logo: this.props.user.logo,
		loadingImage: false
	};

	handleInputChange = ({ target }) => {
		this.setState({ [target.id]: target.value });
	};

	uploadFile = async ({ target }) => {
		this.setState({ loadingImage: true });
		const data = new FormData();
		data.append('file', target.files[0]);
		data.append('upload_preset', 'sale-shop');
		const res = await fetch('https://api.cloudinary.com/v1_1/dlz9sdxba/image/upload', { method: 'POST', body: data });
		const file = await res.json();
		this.setState({
			logo: file.secure_url,
			loadingImage: false
		});
	};

	handleFormSubmit = async (e, updateUser) => {
		e.preventDefault();
		await updateUser().then(() => Router.push('/account'));
	};

	render() {
		const { uploadFile, handleInputChange, handleFormSubmit } = this;
		const { name, logo, loadingImage } = this.state;

		console.log('--->', this.props.user.id);

		return (
			<Mutation mutation={UPDATE_USER_MUTATION}
			          variables={{ id: this.props.user.id, logo, name }}
			          refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
				{(updateUser, { error, loading }) =>
					<Form noValidate
					      onSubmit={e => handleFormSubmit(e, updateUser)}>
						<h2>Update Your Profile</h2>
						<Error error={error} />
						<fieldset className="user-update"
						          disabled={loadingImage || loading} aria-busy={loadingImage || loading}>
							<label htmlFor="file">
								Logo
								<input
									type="file"
									id="file"
									placeholder="Upload an Image"
									onChange={uploadFile}
									required
								/>
							</label>
							{logo && <img src={logo} alt="Upload preview" />}
							<label htmlFor="title">
								Name
								<input
									type="text"
									id="name"
									defaultValue={name}
									placeholder="Name"
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

export default UserUpdate;