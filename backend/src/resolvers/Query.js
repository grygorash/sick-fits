const Query = {
	async getItems(parent, args, ctx) {
		return await ctx.db.query.items();
	},
	async getItem(parent, args, ctx) {
		const where = { id: args.id };
		return await ctx.db.query.item({ where });
	}
};

module.exports = Query;
