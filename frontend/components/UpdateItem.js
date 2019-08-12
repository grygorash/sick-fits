import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { SINGLE_ITEM_QUERY } from '../queries';
import UpdateItemForm from './UpdateItemForm';
import ErrorPage from './ErrorPage';

const UpdateItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
		{({ data }) =>
			data && Object.keys(data).length !== 0 ?
				<UpdateItemForm item={data.item} /> :
				<ErrorPage status={'404'} text={`No Item found for ID: ${id}`} />}
	</Query>;

UpdateItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default UpdateItem;