const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetEmail(data) {
	data.email = !isEmpty(data.email) ? data.email : '';
	data.confirmEmail = !isEmpty(data.confirmEmail) ? data.confirmEmail : '';

	if (Validator.isEmpty(data.email)) {
		throw new Error('Current Email field is required');
	}

	if (!Validator.isEmail(data.email)) {
		throw new Error('Current Email is invalid');
	}

	if (Validator.isEmpty(data.confirmEmail)) {
		throw new Error('New Email field is required');
	}

	if (!Validator.isEmail(data.confirmEmail)) {
		throw new Error('New Email is invalid');
	}

	if (Validator.equals(data.email, data.confirmEmail)) {
		throw new Error('Current and new Email should not match');
	}
};