import SaleList from '../components/SaleList';
import React from 'react';

const Sale = ({ query }) =>
	<SaleList page={+query.page || 1} />;

export default Sale;
