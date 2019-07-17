const Mutations = {
	async createItem(parents, args, ctx, info) {
		// TODO check if they are logged in

		return await ctx.db.mutation.createItem({ data: { ...args } }, info);
	}
};

module.exports = Mutations;
