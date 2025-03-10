import { mutation } from "@convex/server";

export const notes = mutation({
  args: {
    fileId: v.string(),
    note: v.any(),
    createBy: v.string(),
  },
});
