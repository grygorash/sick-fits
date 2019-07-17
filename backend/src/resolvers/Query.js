const Query = {
	async getItems(parent, args, ctx, info) {
		return await ctx.db.query.items();
	}
};

module.exports = Query;
