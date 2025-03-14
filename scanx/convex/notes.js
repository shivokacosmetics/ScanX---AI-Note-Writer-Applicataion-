import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "../convex/_generated/server";
export const AddNotes = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (record?.length == 0) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        notes: args.notes,
        createdBy: args.createdBy,
      });
    } else {
      await ctx.db.patch(record[0]._id, { notes: args.notes });
    }
  },
});
export const GetNotes = async ({ fileId }, ctx) => {
  if (!fileId) {
    throw new Error("fileId is required");
  }

  const note = await ctx.db
    .query("notes")
    .filter((q) => q.eq(q.field("fileId"), fileId))
    .first(); // Make sure to fetch the first matching note

  return note ? note.notes : "";
};
