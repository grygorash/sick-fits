const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignin(data) {
	data.email = !isEmpty(data.email) ? data.email : '';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

	if (Validator.isEmpty(data.email)) {
		throw new Error('Email field is required');
	}

	if (!Validator.isEmail(data.email)) {
		throw new Error('Email is invalid');
	}

	if (Validator.isEmpty(data.name)) {
		throw new Error('Name field is required');
	}

	if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
		throw new Error('Name must be between 3 and 30 characters');
	}

	if (Validator.isEmpty(data.password)) {
		throw new Error('Password field is required');
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		throw new Error('Password must be at least 6 characters');
	}

	if (Validator.isEmpty(data.passwordConfirm)) {
		throw new Error('Confirm password field is required');
	}

	if (!Validator.equals(data.password, data.passwordConfirm)) {
		throw new Error('Passwords must match');
	}

};