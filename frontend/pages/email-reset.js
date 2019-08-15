import React from 'react';
import EmailResetPassword from '../components/ResetEmail';

const EmailReset = ({ query }) =>
	<EmailResetPassword resetToken={query.resetToken} />;

export default EmailReset;