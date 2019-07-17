import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';

const SingleItemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 500px;
	img{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.details{
		margin: 3rem;
		font-size: 2rem;
		.price{
			color: ${props => props.theme.red};
			font-size: 3rem;
		}
	}
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUEY($id: ID!){
        item(where: {id: $id}){
            id
            title
            description
            largeImage
            price
        }
    }
`;

class SingleItem extends Component {
	render() {
		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					const { title, description, largeImage, price } = data.item;
					return !data.item ? <p>No Item found for ID: {this.props.id}</p> :
						loading ? <p>Loading</p> :
							<SingleItemStyles>
								<Head>
									<title>Sick Fits! {title}</title>
								</Head>
								<img src={largeImage} alt={title} />
								<div className="details">
									<h2>Viewing {title}</h2>
									<p>{description}</p>
									<p className="price">{formatMoney(price)}</p>
								</div>
							</SingleItemStyles>;
				}}
			</Query>
		);
	}
}

export default SingleItem;