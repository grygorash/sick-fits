import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Item from './Item';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY{
        getItems{
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

class Items extends Component {
	state = {};

	render() {
		return (
			<Center>
				<Query query={ALL_ITEMS_QUERY}>
					{({ data, error, loading }) =>
						loading ? <p>Loading...</p> :
							error ? <p>{error.message}</p> :
								<ItemsList>
									{data.getItems.map(item =>
										<Item key={item.id} item={item} />
									)}
								</ItemsList>
					}
				</Query>
			</Center>
		);
	}
}

export default Items;
export { ALL_ITEMS_QUERY };