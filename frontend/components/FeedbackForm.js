import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { FaStar } from 'react-icons/fa';

import Form from './styles/Form';
import { SINGLE_ORDER_QUERY } from '../queries';
import Error from './ErrorMessage';
import { CREATE_FEEDBACK_MUTATION } from '../mutations';

class FeedbackForm extends Component {
	static propTypes = {
		orderItemId: PropTypes.string.isRequired,
		orderId: PropTypes.string.isRequired,
		sellerId: PropTypes.string.isRequired
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
		const { orderItemId, orderId, sellerId } = this.props;
		const { rating, rateArr, text } = this.state;

		return (
			<Mutation mutation={CREATE_FEEDBACK_MUTATION}
			          variables={{ rating, text, sellerId, orderItemId }}
			          refetchQueries={[{ query: SINGLE_ORDER_QUERY, variables: { id: orderId } }]}>
				{(createFeedback, { loading, error }) => {
					return <Form noValidate onSubmit={e => handleFormSubmit(e, createFeedback)}>
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
			</Mutation>
		);
	}
}

export default FeedbackForm;