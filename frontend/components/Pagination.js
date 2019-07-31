import React from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import { PAGINATION_QUERY } from '../queries';
import { perPage } from '../config';
import PropTypes from 'prop-types';

const Pagination = ({ page }) =>
	<Query query={PAGINATION_QUERY}>
		{({ data }) => {
			const count = data.itemsConnection.aggregate.count;
			const pages = Math.ceil(count / perPage);
			return (
				<PaginationStyles>
					<Head><title>Sick Fits! Page {page} of {pages}</title></Head>
					<Link href={{
						pathname: 'items',
						query: { page: page - 1 }
					}}>
						<a className="prev" aria-disabled={page <= 1}>Prev</a>
					</Link>
					<p>Page {page} of {pages}</p>
					<p>{count} Items Total</p>
					<Link href={{
						pathname: 'items',
						query: { page: page + 1 }
					}}>
						<a className="prev" aria-disabled={page >= pages}>Next</a>
					</Link>
				</PaginationStyles>);
		}}
	</Query>;

Pagination.propTypes = {
	page: PropTypes.number.isRequired
};

export default Pagination;