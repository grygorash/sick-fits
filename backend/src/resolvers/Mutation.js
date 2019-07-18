const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const validateSignin = require('../validation/validateSignin');
const validateSignup = require('../validation/validateSignup');
const validateRequestReset = require('../validation/validateRequestReset');
const validateResetPassword = require('../validation/validateResetPassword');
const { transport, makeANiceEmail } = require('../mail');

const Mutations = {
	async createItem(parents, args, ctx, info) {
		// TODO check if they are logged in

		return await ctx.db.mutation.createItem({ data: { ...args } }, info);
	},
	async updateItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// first take a copy of the updates
		const updates = { ...args };
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem({
			data: updates,
			where
		}, info);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// find the item
		const item = await ctx.db.query.item({ where }, `{id title}`);
		// check if they own that item or have the permissions
		// TODO
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
		if (user) {
			throw new Error(`User with this email: ${email} already exists`);
		}

		// hash their password
		const passwordHash = await bcrypt.hash(password, 10);

		// create the user in the database
		return await ctx.db.mutation.createUser({
			data: {
				email,
				name,
				password: passwordHash,
				permissions: { set: ['USER'] }
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
		if (!user) {
			throw new Error(`No such user found for email ${email}`);
		}

		// check if their password is correct
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid password');
		}

		// generate JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

		// set the cookie with the token
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		});

		// return the user
		return user;
	},
	signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async requestReset(parent, { email }, ctx, info) {
		// check basic validation
		validateRequestReset({ email });

		// check if this is a real user
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`No such user found for email ${email}`);
		}
		// set reset token and expiry on that user
		const resetToken = (await promisify(randomBytes)(20)).toString('hex');
		const resetExpiry = Date.now() + 3600000; // 1hour from now
		const res = await ctx.db.mutation.updateUser({
			where: { email },
			data: { resetToken, resetExpiry }
		});
		// email them that reset token
		await transport.sendMail({
			from: 'sbuynyj@gmail.com',
			to: user.email,
			subject: 'Your Password Reset Token',
			html: makeANiceEmail(`<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset</a>`)
		});

		// return the message
		return { message: 'Thanks' };
	},
	async resetPassword(parent, args, ctx, info) {
		// check basic validation
		validateResetPassword({
			password: args.password,
			confirmPassword: args.confirmPassword
		});

		// check if its a legit reset token

		// check if its expired
		const [user] = await ctx.db.query.users({
			where: { resetToken: args.resetToken },
			resetExpiry_gte: Date.now() - 3600000
		});
		if (!user) {
			throw new Error('This token is either invalid or expired');
		}

		// hash their new password
		const password = await bcrypt.hash(args.password, 10);

		// save the new password to the user and remove old resetToken fields
		const updatedUser = await ctx.db.mutation.updateUser({
			where: { email: user.email },
			data: {
				password,
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
	}
};

module.exports = Mutations;
