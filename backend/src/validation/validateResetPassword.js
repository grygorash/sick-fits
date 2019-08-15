const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetPassword(data) {
	data.password = !isEmpty(data.password) ? data.password : '';
	data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
	if (Validator.isEmpty(data.password)) throw new Error('New password field is required');
	if (!Validator.isLength(data.password, {
		min: 6,
		max: 30
	})) throw new Error('Password must be at least 6 characters');
	if (Validator.isEmpty(data.confirmPassword)) throw new Error('Confirm password field is required');
	if (!Validator.equals(data.password, data.confirmPassword)) throw new Error('Passwords must match');
};