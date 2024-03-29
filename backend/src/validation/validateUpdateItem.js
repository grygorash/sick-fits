const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateItem(data) {
	data.title = !isEmpty(data.title) ? data.title : '';
	if (!data.image.length) throw new Error('Image field is required');
	if (Validator.isEmpty(data.title)) throw new Error('Title field is required');
	if (data.price === 0) throw new Error('Price field is required');
};