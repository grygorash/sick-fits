import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import Downshift, { resetIdCounter } from 'downshift';

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { SEARCH_ITEMS_QUERY } from '../queries';


class AutoComplete extends Component {
	state = {
		items: [],
		loading: false
	};

	handleSearch = async (e, client) => {
		if (e.target.value.trim().length !== 0) {
			this.setState({ loading: true });
			const res = await client.query({
				query: SEARCH_ITEMS_QUERY,
				variables: { searchTerm: e.target.value.trim() }
			});
			this.setState({ items: res.data.items, loading: false });
		} else {
			this.setState({ items: [] });
		}
	};

	handleRouteToItem = ({ id }) => {
		this.setState({ items: [] });
		Router.push({
			pathname: '/item',
			query: { id }
		});
	};

	render() {
		const { handleSearch, handleRouteToItem } = this;
		const { items, loading } = this.state;

		resetIdCounter();
		return (
			<SearchStyles>
				<Downshift onChange={handleRouteToItem} itemToString={item => item === null ? '' : item.title}>
					{({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => {
						return <div>
							<ApolloConsumer>
								{client =>
									<input {...getInputProps({
										type: 'search',
										placeholder: 'Seach for Item',
										className: this.state.loading ? 'loading' : '',
										onChange: async e => await handleSearch(e, client)
									})} />}
							</ApolloConsumer>
							{isOpen &&
							<DropDown>
								{items.map((item, i) =>
									<DropDownItem {...getItemProps({ item })}
									              key={item.id}
									              highlighted={i === highlightedIndex}
									              onClick={() => handleRouteToItem(item)}>
										<img width="50" src={item.image} alt={item.title} />
										{item.title}
									</DropDownItem>)}
								{!items.length && !loading && inputValue.trim().length !== 0 &&
								<DropDownItem>Nothing found for {inputValue}</DropDownItem>}
							</DropDown>}
						</div>;
					}}
				</Downshift>
			</SearchStyles>
		);
	}
}

export default AutoComplete;