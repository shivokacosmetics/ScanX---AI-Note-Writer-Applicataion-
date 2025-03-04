// import React from "react";
// import Underline from "@tiptap/extension-underline";
// import Highlight from "@tiptap/extension-highlight";
// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import {
//   Bold,
//   Heading1,
//   Heading2,
//   Heading3Icon,
//   Highlighter,
//   Italic,
//   Sparkles,
//   UnderlineIcon,
// } from "lucide-react";
// import { useAction } from "convex/react";
// //import { api } from "../convex/_generated/api";
// // import { api } from "../convex/_generated/api";
// import { Editor } from "@tiptap/react";
// import { api } from "@convex/api";

// // import { useParams } from "next/router";
// import { fileId } from "convex/values";
// import { useParams } from "next/navigation"; // Changed from next/router
// import { chatSession } from "configs/AIModel";
// function EditorExtension({ editor }) {
//   const { fileid } = useParams();
//   const SearchAI = useAction(api.myAction.SearchAI);
//   const onAiClick = async () => {
//     // AI logic
//     //console.log("AI Clicked");
//     const selectedText = editor.state.doc.textBetween(
//       editor.state.selection.from,
//       editor.state.selection.to,
//       " "
//     );
//     console.log(selectedText);
//     const result = await SearchAI({
//       query: selectedText,
//       fileId: fileid,
//     });
//     const UnformattedAns = JSON.parse(result);
//     let AllUnformattedAns = " ";
//     UnformattedAns &&
//       UnformattedAns.forEach((item) => {
//         AllUnformattedAns = AllUnformattedAns + item.pageContent;
//       });
//     const PROMPT =
//       "For question :" +
//       selectedText +
//       " and with the given content as an answer " +
//       "please give appropriate answer in HTML format . The answer content is :" +
//       AllUnformattedAns;
//     const AiModelResult = await chatSession.sendMessage(PROMPT);
//     console.log(AiModelResult.response.text());
//   };
//   return (
//     <div className="button-group">
//       <div className="control-group flex gap-20">
//         <div className="button-group ">
//           {editor && ( // Conditionally render when editor is available
//             <div>
//               <button
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 //comment is added
//                 className={editor.isActive("bold") ? "text-red-600" : ""}
//               >
//                 <Bold size={24} />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//                 className={editor.isActive("italic") ? "text-red-600" : ""}
//               >
//                 <Italic size={24} />
//               </button>
//               <button
//                 onClick={() =>
//                   editor
//                     .chain()
//                     .focus()
//                     .toggleHighlight({ color: "#ffc078" })
//                     .run()
//                 }
//                 className={
//                   editor.isActive("highlight", { color: "#ffc078" })
//                     ? "is-active"
//                     : ""
//                 }
//               >
//                 <Highlighter size={24} />
//               </button>
//               <button
//                 onClick={() => editor.chain().focus().toggleUnderline().run()}
//                 className={editor.isActive("underline") ? "text-red-600" : ""}
//               >
//                 <UnderlineIcon size={24} />
//               </button>

//               <button
//                 onClick={() =>
//                   editor.chain().focus().toggleHeading({ level: 1 }).run()
//                 }
//                 className={
//                   editor.isActive("heading", { level: 1 }) ? "is-active" : ""
//                 }
//               >
//                 <Heading1 size={24} />
//               </button>
//               <button
//                 onClick={() =>
//                   editor.chain().focus().toggleHeading({ level: 2 }).run()
//                 }
//                 className={
//                   editor.isActive("heading", { level: 2 }) ? "is-active" : ""
//                 }
//               >
//                 <Heading2 size={24} />
//               </button>
//               <button
//                 onClick={() =>
//                   editor.chain().focus().toggleHeading({ level: 3 }).run()
//                 }
//                 className={
//                   editor.isActive("heading", { level: 3 }) ? "is-active" : ""
//                 }
//               >
//                 <Heading3Icon size={24} />
//               </button>
//               <button
//                 onClick={() => onAiClick()}
//                 className={"hover : text-purple-600"}
//               >
//                 <Sparkles />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditorExtension;

import React, { useCallback } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3Icon,
  Highlighter,
  Italic,
  Sparkles,
  UnderlineIcon,
} from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@convex/api";
import { useParams } from "next/navigation";
import { chatSession } from "configs/AIModel";

function EditorExtension({ editor }) {
  // Get file ID from route params
  const { fileid } = useParams();

  // Convex AI search action
  const SearchAI = useAction(api.myAction.SearchAI);

  // AI Assistance Click Handler
  const onAiClick = useCallback(async () => {
    // Validate editor and file ID
    if (!editor) {
      console.error("Editor is not initialized");
      return;
    }

    if (!fileid) {
      console.error("File ID is missing");
      return;
    }

    // Get selected text
    const selectedText = editor.state.doc
      .textBetween(editor.state.selection.from, editor.state.selection.to, " ")
      .trim();

    // Validate selected text
    if (!selectedText) {
      alert("Please select some text before using AI assistance");
      return;
    }

    try {
      // Search for relevant context
      const result = await SearchAI({
        query: selectedText,
        fileId: fileid,
      });

      // Parse context
      const unformattedAnswers = result ? JSON.parse(result) : [];
      const contextContent = unformattedAnswers
        .map((item) => item.pageContent)
        .join(" ");

      // Prepare AI prompt
      const prompt = `Context: ${contextContent}\n\nQuestion: ${selectedText}\n\nProvide a comprehensive and clear answer based on the context.`;

      // Get AI response
      const aiResponse = await chatSession.sendMessage(prompt);
      const responseText = await aiResponse.response.text();

      // Validate AI response
      if (!responseText) {
        throw new Error("No response received from AI");
      }

      // Insert AI response into editor
      editor.commands.insertContent(`
        <div class="ai-response">
          <strong>AI Response:</strong>
          <p>${responseText}</p>
        </div>
      `);
    } catch (error) {
      console.error("AI Assistance Error:", error);
      alert("Failed to get AI assistance. Please try again.");
    }
  }, [editor, fileid, SearchAI]);

  // Prevent rendering if editor is not available
  if (!editor) return null;

  return (
    <div className="editor-toolbar">
      <div className="flex items-center space-x-2">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button ${editor.isActive("bold") ? "active" : ""}`}
        >
          <Bold size={24} />
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button ${editor.isActive("italic") ? "active" : ""}`}
        >
          <Italic size={24} />
        </button>

        {/* Highlight Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()
          }
          className={`toolbar-button ${
            editor.isActive("highlight", { color: "#ffc078" }) ? "active" : ""
          }`}
        >
          <Highlighter size={24} />
        </button>

        {/* Underline Button */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-button ${editor.isActive("underline") ? "active" : ""}`}
        >
          <UnderlineIcon size={24} />
        </button>

        {/* Heading Buttons */}
        {[1, 2, 3].map((level) => {
          const HeadingIcon =
            level === 1 ? Heading1 : level === 2 ? Heading2 : Heading3Icon;
          return (
            <button
              key={`heading-${level}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={`toolbar-button ${
                editor.isActive("heading", { level }) ? "active" : ""
              }`}
            >
              <HeadingIcon size={24} />
            </button>
          );
        })}

        {/* AI Assistance Button */}
        <button
          onClick={onAiClick}
          className="toolbar-button hover:text-purple-600"
        >
          <Sparkles />
        </button>
      </div>
    </div>
  );
}

export default EditorExtension;
