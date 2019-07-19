import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';
import Error from './ErrorMessage';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}){
        items(first: $first, skip: $skip){
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const Center = styled.div`
	text-align: center;
`;

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
`;

const Items = ({ page }) =>
	<Center>
		<Pagination page={page} />
		<Query query={ALL_ITEMS_QUERY}
		       variables={{ skip: page * perPage - perPage }}>
			{({ data, error, loading }) =>
				loading ? <p>Loading...</p> :
					error ? <Error error={error} /> :
						<ItemsList>
							{data.items.map(item =>
								<Item key={item.id} item={item} />
							)}
						</ItemsList>
			}
		</Query>
		<Pagination page={page} />
	</Center>;


export default Items;
export { ALL_ITEMS_QUERY };