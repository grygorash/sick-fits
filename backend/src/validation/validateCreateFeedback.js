const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateFeedback(data) {
	data.text = !isEmpty(data.text) ? data.text : '';
	if (data.rating === 0) throw new Error('Rate is required');
	if (Validator.isEmpty(data.text)) throw new Error('Feedback field is required');
};