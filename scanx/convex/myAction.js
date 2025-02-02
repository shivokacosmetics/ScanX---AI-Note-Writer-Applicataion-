import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { action } from "./_generated/server.js";
import { action } from "./_generated/server.js";
import { TaskType } from "@goggle/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google";
export const ingest = action({
  args: {},
  handler: async (ctx) => {
    await ConvexVectorStore.fromTexts(
      ["Hello world", "Bye bye", "What's this?"],
      [{ prop: 2 }, { prop: 1 }, { prop: 3 }],
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyBo4YEEBKLQU0Xhxx8RTSIdWB97rvoOJS0",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});
