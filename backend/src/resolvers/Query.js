const { forwardTo } = require('prisma-binding');

const hasPermission = require('../utils');

const Query = {
	// items: forwardTo('db'),
	async items(parent, args, ctx, info) {
		const user = args.account ? { id: ctx.request.userId } : { id_not: ctx.request.userId };
		const title_contains = args.where && args.where.OR && args.where.OR[0].title_contains;
		const description_contains = args.where && args.where.OR && args.where.OR[0].description_contains;

		return await ctx.db.query.items({
			orderBy: args.orderBy,
			skip: args.skip,
			first: args.first,
			where: { user, title_contains, description_contains }
		}, info);
	},
	item: forwardTo('db'),
	// itemsConnection: forwardTo('db'),
	async itemsConnection(parent, args, ctx, info) {
		const { userId } = ctx.request;

		return await ctx.db.query.itemsConnection({
			where: { user: { id_not: userId } }
		}, info);
	},
	me(parent, args, ctx, info) {
		// check if there is a current user ID
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user({
			where: { id: ctx.request.userId }
		}, info);
	},
	async users(parent, args, ctx, info) {
		// check if they logged in
		if (!ctx.request.userId) {
			throw new Error('You must be logged in');
		}

		// check if the user has the permissions to query all the users
		hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

		// if they do, query all the users
		return ctx.db.query.users({}, info);
	},
	async orders(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) throw new Error('You are not logged in');
		return await ctx.db.query.orders({
			where: { user: { id: userId } }
		}, info);
	},
	async order(parent, args, ctx, info) {
		// make sure they are logged in
		if (!ctx.request.userId) throw new Error('You are not logged in');

		// query the current order
		const order = await ctx.db.query.order({
			where: { id: args.id }
		}, info);

		// check if they have the permissions to see this order
		const ownsOrder = order.user.id === ctx.request.userId;
		if (!ownsOrder) throw new Error('You cant see this');

		// return order
		return order;
	}
};

module.exports = Query;
