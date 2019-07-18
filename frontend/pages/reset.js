import React from 'react';
import ResetPassword from '../components/ResetPassword';

const Reset = ({ query }) =>
	<ResetPassword resetToken={query.resetToken}/>;

export default Reset;