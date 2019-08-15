const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignin(data) {
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	if (Validator.isEmpty(data.email)) throw new Error('Email field is required');
	if (!Validator.isEmail(data.email)) throw new Error(`Email is invalid`);
	if (Validator.isEmpty(data.password)) throw new Error('Password field is required');
};