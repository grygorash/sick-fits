import React from 'react';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { SINGLE_USER_QUERY } from '../queries';
import SingleUserStyles from './styles/SingleUserStyles';
import formatMoney from '../lib/formatMoney';
import ErrorPage from './ErrorPage';

const ratingRender = rating => {
	const firstChar = +`${rating}`.charAt(0);
	const secondChar = +`${rating}`.charAt(2);

	return [1, 2, 3, 4, 5].map(val =>
		val <= firstChar ? <FaStar key={val} color="orange" size="19" /> :
			val === firstChar + 1 && secondChar >= 5 ? <FaStarHalfAlt key={val} color="orange" size="19" /> :
				<FaStar key={val} color="lightgrey" size="19" />);
};

const SingleUser = ({ id }) =>
	<Query query={SINGLE_USER_QUERY}
	       variables={{ id }}>
		{({ data }) =>
			data && Object.keys(data).length !== 0 ?
				<SingleUserStyles>
					<div className="user-info">
						<img src={data.user.logo} alt={data.user.name} className="logo-user" />
						<div>
							<p>Seller: <span>{data.user.name}</span></p>
							{data.user.ratingSum !== 0 && <p>Rating: <span>{ratingRender(data.user.ratingSum)}</span></p>}
						</div>
					</div>
					<div className="user-feedback">
						<h2>{data.user.name} has {data.user.feedback.length} Feedback{data.user.feedback.length === 1 ? '' : 's'}</h2>
						{data.user.feedback.map(feedback =>
							<div key={feedback.id}>
								<p>Feedback: {feedback.text}</p>
								<p>Rating: {feedback.rating}</p>
								<p>Left by: <button>
									<Link href={{
										pathname: '/user',
										query: { id: feedback.whoLeftId }
									}}><a>{feedback.whoLeft}</a></Link>
								</button>
								</p>
								<p>Left at: {format(new Date(feedback.createdAt), 'MMMM d, yyyy HH:mm')}</p>
							</div>
						)}
					</div>
					<div className="user-items">
						<h2>{data.user.name} has {data.user.items.length} Item{data.user.items.length === 1 ? '' : 's'}</h2>
						{data.user.items.map(item =>
							<Link key={item.id}
							      href={{
								      pathname: '/item',
								      query: { id: item.id }
							      }}>
								<a>
									<img src={item.image[0]} alt={item.title} />
									<p>Title: {item.title}</p>
									<p>Price: {formatMoney(item.price)}</p>
									<p>Created At: {format(new Date(item.createdAt), 'MMMM d, yyyy HH:mm')}</p>
								</a>
							</Link>
						)}
					</div>
				</SingleUserStyles> :
				<ErrorPage status="404" text={`No user found for ID: ${id}`} />}
	</Query>;

export default SingleUser;