const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateItem(title, price, image) {
	title = !isEmpty(title) ? title : '';
	if (!image.length) throw new Error('Image field is required');
	if (Validator.isEmpty(title)) throw new Error('Title field is required');
	if (price === 0) throw new Error('Price field is required');
};