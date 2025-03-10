import { mutation } from "@convex/server";

export const notes = mutation({
  args: {
    fileId: v.string(),
    note: v.any(),
    createBy: v.string(),
  },
  handler: async (ctx, args) => {
    const recordId = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (recordId.length == 0) {
      await ctx.db.query("notes", {
        fileId: args.fileId,
        notes: args.note,
        createBy: args.createBy,
      });
    } else {
      await ctx.db.patch(record[0].id, {
        notes: args.notes,
        //createBy: args.createBy,
      });
    }
  },
});
