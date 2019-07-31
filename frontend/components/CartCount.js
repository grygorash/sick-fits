import React from 'react';
import PropTypes from 'prop-types';

import Dot from './styles/Dot';

const CartCount = ({ count }) => <Dot>{count}</Dot>;

CartCount.propTypes = {
	count: PropTypes.number.isRequired
};

export default CartCount;