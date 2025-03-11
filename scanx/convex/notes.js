// import { mutation } from "@convex/server";
// import { v } from "convex/values"; // ✅ Import v properly

// export const notes = mutation({
//   args: {
//     fileId: v.string(),
//     note: v.any(),
//     createBy: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const recordId = await ctx.db
//       .query("notes")
//       .filter((q) => q.eq(q.field("fileId"), args.fileId))
//       .collect();

//     if (recordId.length == 0) {
//       await ctx.db.query("notes", {
//         fileId: args.fileId,
//         notes: args.note,
//         createBy: args.createBy,
//       });
//     } else {
//       await ctx.db.patch(record[0].id, {
//         notes: args.notes,
//         //createBy: args.createBy,
//       });
//     }
//   },
// });
import { mutation } from "@convex/server";
import { v } from "convex/values";

export const addNotes = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(), // ✅ Changed from `note` to `notes`
    createBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const recordId = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    if (recordId.length === 0) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        notes: args.notes, // ✅ Matching the expected key
        createBy: args.createBy,
      });
    } else {
      await ctx.db.patch(recordId[0].id, {
        notes: args.notes, // ✅ Matching the expected key
      });
    }
  },
});
