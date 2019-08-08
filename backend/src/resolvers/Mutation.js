const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const validateCreateItem = require('../validation/validateCreateItem');
const validateUpdateItem = require('../validation/validateUpdateItem');
const validateSignin = require('../validation/validateSignin');
const validateSignup = require('../validation/validateSignup');
const validateRequestReset = require('../validation/validateRequestReset');
const validateResetPassword = require('../validation/validateResetPassword');
const { transport, makeANiceEmail } = require('../mail');
const hasPermission = require('../utils');
const stripe = require('../stripe');

const Mutations = {
	async createItem(parents, args, ctx, info) {
		// check basic validation
		validateCreateItem(args);

		if (!ctx.request.userId) {
			throw new Error('You must be logged in to do that!');
		}

		return await ctx.db.mutation.createItem({
			data: {
				// how to create relationship between item and user
				user: {
					connect: {
						id: ctx.request.userId
					}
				},
				...args,
				createdAt: new Date()
			}
		}, info);
	},
	async updateItem(parent, args, ctx, info) {
		// check basic validation
		validateUpdateItem(args);
		const where = { id: args.id };
		// first take a copy of the updates
		const data = { ...args };
		// remove the ID from the updates
		delete data.id;
		// run the update method
		return ctx.db.mutation.updateItem({ data, where }, info);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// find the item
		const item = await ctx.db.query.item({ where }, `{id title user{ id }}`);
		// check if they own that item or have the permissions
		const ownsItem = item.user.id === ctx.request.userId;
		const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));
		if (!ownsItem && !hasPermissions) throw new Error('You don"t have permissions to do that');
		// delete it
		return ctx.db.mutation.deleteItem({ where }, info);
	},
	async signup(parent, { email, name, password, passwordConfirm }, ctx, info) {
		// lowercase their email
		email = email.toLocaleLowerCase();
		// check basic validation
		validateSignup({ email, name, password, passwordConfirm });
		// check if their is a user with that email
		const user = await ctx.db.query.user({ where: { email } });
		if (user) throw new Error(`User with this email: ${email} already exists`);
		// hash their password
		const passwordHash = await bcrypt.hash(password, 10);
		// create the user in the database
		return await ctx.db.mutation.createUser({
			data: {
				email,
				name,
				password: passwordHash,
				permissions: { set: ['USER', 'ADMIN'] }
			}
		}, info);
		// create the JWT token for them
		// const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// we set the JWT as a cookie on the response
		// ctx.response.cookie('token', token, {
		// 	httpOnly: true,
		// 	maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		// });
		// return the user to the browser
	},
	async signin(parent, { email, password }, ctx, info) {
		// check basic validation
		validateSignin({ email, password });
		// check if their is a user with that email
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) throw new Error(`No such user found for email ${email}`);
		// check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) throw new Error('Invalid password');
		// generate JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 3600 // 1 hour cookie
		});
		// return the user
		return user;
	},
	async signout(parent, args, ctx, info) {
		await ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async requestReset(parent, { email }, ctx, info) {
		// check basic validation
		validateRequestReset({ email });
		const where = { email };
		// check if this is a real user
		const user = await ctx.db.query.user({ where });
		if (!user) throw new Error(`No such user found for email ${email}`);
		// set reset token and expiry on that user
		const resetToken = (await promisify(randomBytes)(20)).toString('hex');
		const resetExpiry = Date.now() + 3600; // 1hour from now
		await ctx.db.mutation.updateUser({
			where,
			data: { resetToken, resetExpiry }
		});
		// email them that reset token
		await transport.sendMail({
			from: 'sick-fits@gmail.com',
			to: user.email,
			subject: 'Your Password Reset Token',
			html: makeANiceEmail(`<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset</a>`)
		});
		// return the message
		return { message: 'Thanks' };
	},
	async resetPassword(parent, { password, confirmPassword, resetToken }, ctx, info) {
		// check basic validation
		validateResetPassword({
			password,
			confirmPassword
		});
		// check if its a legit reset token

		// check if its expired
		const [user] = await ctx.db.query.users({
			where: { resetToken },
			resetExpiry_gte: Date.now() - 3600
		});
		if (!user) throw new Error('This token is either invalid or expired');
		// hash their new password
		const hashedPassword = await bcrypt.hash(password, 10);
		// save the new password to the user and remove old resetToken fields
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetExpiry: null
			}
		});
		// generate JWT
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
		// set the JWT
		ctx.response.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
		// return the new user
		return updatedUser;
	},
	async updatePermissions(parent, { permissions, userId }, ctx, info) {
		const where = { id: ctx.request.userId };
		// check if they are logged in
		if (!ctx.request.userId) throw new Error('You must be logged in');
		// query the current user
		const currentUser = await ctx.db.query.user({ where }, info);
		//check if they have permissions to do this
		hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

		// update the permission
		return ctx.db.mutation.updateUser({
			data: { permissions: { set: permissions } },
			where: { id: userId }
		}, info);
	},
	async addToCart(parent, args, ctx, info) {
		//  make sure they are signed in
		const { userId } = ctx.request;
		if (!userId) throw new Error('You must be signed in soon');
		// query the users current cart
		const where = { user: { id: userId }, item: { id: args.id } };
		const [existingCartItem] = await ctx.db.query.cartItems({ where });
		// check if that item is already in their cart and increment by 1 if it is
		if (existingCartItem) return ctx.db.mutation.updateCartItem({
			where: { id: existingCartItem.id },
			data: { quantity: existingCartItem.quantity + 1 }
		}, info);

		// if its not, create a fresh CartItem for that user
		return ctx.db.mutation.createCartItem({
			data: {
				user: {
					connect: { id: userId }
				},
				item: {
					connect: { id: args.id }
				}
			}
		}, info);
	},
	async removeFromCart(parent, args, ctx, info) {
		const where = { id: args.id };
		// find the cart item
		const cartItem = await ctx.db.query.cartItem({ where }, '{id, user { id }}');
		// make sure we found an item
		if (!cartItem) throw new Error('No cart item found');
		// make sure they own that cart item
		if (cartItem.user.id !== ctx.request.userId) throw new Error('Cheating!');
		// delete that cart item
		return ctx.db.mutation.deleteCartItem({ where }, info);
	},
	async createOrder(parent, args, ctx, info) {
		// query the current user and make sure they are signed in
		const { userId } = ctx.request;
		if (!userId) throw new Error('You must be signed in to complete this order');

		const user = await ctx.db.query.user(
			{ where: { id: userId } },
			`{
			id 
			name 
			email
			cart { 
				id 
				quantity 
				item {
					id
					title 
					price 
					description 
					image 
					largeImage
				} 
			}}`
		);
		// recalculate the total for the price
		const amount = user.cart.reduce((tally, cartItem) => tally + cartItem.item.price * cartItem.quantity, 0);
		// create the stripe charge(turn token into money)
		const charge = await stripe.charges.create({
			amount,
			currency: 'USD',
			source: args.token
		});
		// convert the CartItems to OrderItems
		const orderItems = user.cart.map(cartItem => {
			const orderItem = {
				...cartItem.item,
				quantity: cartItem.quantity,
				user: { connect: { id: userId } }
			};
			delete orderItem.id;
			return orderItem;
		});
		// create the SingleOrder
		const order = await ctx.db.mutation.createOrder({
			data: {
				total: charge.amount,
				charge: charge.id,
				items: { create: orderItems },
				user: { connect: { id: userId } },
				createdAt: new Date()
			}
		});
		// clean up - clear the users cart, delete cartItems
		const cartItemsIds = user.cart.map(cartItem => cartItem.id);
		await ctx.db.mutation.deleteManyCartItems({ where: { id_in: cartItemsIds } });
		// return the order to the client
		return order;
	}
};

module.exports = Mutations;
