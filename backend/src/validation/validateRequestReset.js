const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRequestReset(data) {
	data.email = !isEmpty(data.email) ? data.email : '';

	if (Validator.isEmpty(data.email)) {
		throw new Error('Email field is required');
	}

	if (!Validator.isEmail(data.email)) {
		throw new Error(`Email is invalid`);
	}
};