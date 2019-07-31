const { forwardTo } = require('prisma-binding');

const { hasPermission } = require('../utils');

const Query = {
	items: forwardTo('db'),
	// async items(parent, args, ctx, info) {
	// 	return await ctx.db.query.items();
	// },

	item: forwardTo('db'),
	// async item(parent, args, ctx, info) {
	// 	const where = { id: args.where.id };
	// 	return await ctx.db.query.item({ where });
	// },

	itemsConnection: forwardTo('db'),

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
			throw new Error('You must br logged in');
		}

		// check if the user has the permissions to query all the users
		hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

		// if they do, query all the users
		return ctx.db.query.users({}, info);
	}
};

module.exports = Query;
