const { forwardTo } = require('prisma-binding');

const Query = {
	items: forwardTo('db'),
	// async getItems(parent, args, ctx, info) {
	// 	return await ctx.db.query.items();
	// },

	item: forwardTo('db'),
	// async getItem(parent, args, ctx, info) {
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
	}
};

module.exports = Query;
