import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { SINGLE_ITEM_QUERY } from '../queries';
import UpdateItemForm from './UpdateItemForm';
import ErrorPage from './ErrorPage';

const UpdateItem = ({ id }) =>
	<Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
		{({ data }) =>
			!data.item ?
				<ErrorPage status={'404'} text={`No Item found for ID: ${id}`} /> :
				<UpdateItemForm id={id} item={data.item} />}
	</Query>;

UpdateItem.propTypes = {
	id: PropTypes.string.isRequired
};

export default UpdateItem;