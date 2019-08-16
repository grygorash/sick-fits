import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import Head from 'next/head';
import { FaStar } from 'react-icons/fa';

import Form from './styles/Form';
import { SINGLE_USER_QUERY } from '../queries';
import Error from './ErrorMessage';
import { CREATE_FEEDBACK_MUTATION } from '../mutations';

class FeedbackForm extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};

	state = {
		rating: 0,
		rateArr: [0, 0, 0, 0, 0],
		text: ''
	};

	handleRate = i =>
		this.setState({
			rating: i + 1,
			rateArr: this.state.rateArr.map((rate, rateIndex) => rateIndex <= i ? 1 : 0)
		});

	handleInputChange = ({ target }) =>
		this.setState({ [target.id]: target.value });

	handleFormSubmit = async (e, createFeedback) => {
		e.preventDefault();
		await createFeedback();
	};

	render() {
		const { handleRate, handleInputChange, handleFormSubmit } = this;
		const { id } = this.props;
		const { rating, rateArr, text } = this.state;

		return (
			<Query query={SINGLE_USER_QUERY}
			       variables={{ id }}>
				{({ data }) =>
					<Mutation mutation={CREATE_FEEDBACK_MUTATION}
					          variables={{ rating, text, sellerId: data.user.id }}>
						{(createFeedback, { loading, error, called }) => {
							return <Form noValidate onSubmit={e => handleFormSubmit(e, createFeedback)}>
								<Head><title>Sale! Feedback</title></Head>
								<h2>Leave Feedback for {data.user.name}</h2>
								<Error error={error} />
								<fieldset disabled={loading} aria-busy={loading}>
									<div className="rate-field">
										<label>Choose Rate</label>
										{rateArr.map((rate, i) =>
											<FaStar key={i}
											        color={rate === 0 ? 'lightgrey' : 'orange'}
											        size="19"
											        onClick={() => handleRate(i)} />)}
									</div>
									<label htmlFor="description">
										Enter Feedback
										<textarea
											id="text"
											value={text}
											placeholder="Feedback"
											onChange={handleInputChange}
											required
										/>
									</label>
									<button type="submit">Leav{loading ? 'ing' : 'e'} Feedback</button>
								</fieldset>
							</Form>;
						}}
					</Mutation>}
			</Query>
		);
	}
}

export default FeedbackForm;