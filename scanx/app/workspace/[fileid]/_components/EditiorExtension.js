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
//     const FinalAns = AiModelResult.response
//       .text()
//       .replace("``", "")
//       .replace("html", " ");

//     const AllText = editor.getHTML();
//     editor.commands.setContent(
//       AllText + "<p><strong>Answer:</strong>" + FinalAns + "</p>"
//     );
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

import React from "react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
function EditorExtension({ editor }) {
  const params = useParams();
  const fileid = params?.fileid || ""; // Ensure fileid is defined

  const SearchAI = useAction(api.myAction.SearchAI);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user, isLoaded, isSignedIn } = useUser();
  // const onAiClick = async () => {
  //   toast("AI processing started...");
  //   if (!editor) return;

  //   const selectedText = editor.state.doc.textBetween(
  //     editor.state.selection.from,
  //     editor.state.selection.to,
  //     " "
  //   );

  //   if (!selectedText.trim()) {
  //     console.warn("No text selected for AI processing.");
  //     return;
  //   }

  //   try {
  //     const result = await SearchAI({ query: selectedText, fileId: fileid });

  //     const UnformattedAns =
  //       typeof result === "string" ? JSON.parse(result) : result;
  //     let AllUnformattedAns =
  //       UnformattedAns?.map((item) => item.pageContent).join(" ") || "";

  //     const PROMPT = `
  //       For question: ${selectedText}
  //       and with the given content as an answer,
  //       please provide an appropriate answer in HTML format.
  //       The answer content is: ${AllUnformattedAns}
  //     `;

  //     const AiModelResult = await chatSession.sendMessage(PROMPT);
  //     const aiResponseText = await AiModelResult.response.text();
  //     const FinalAns = aiResponseText.replace(/``|html/g, ""); // Remove unwanted syntax

  //     const AllText = editor.getHTML();
  //     editor.commands.setContent(
  //       `${AllText}<p><strong>Answer:</strong> ${FinalAns}</p>`
  //     );
  //   } catch (error) {
  //     console.error("Error in AI processing:", error);
  //   }
  //   saveNotes({
  //     notes: editor.getHTML(),
  //     fileId: fileid,
  //     createdBy: user?.primaryEmailAddress?.emailAddress, // Now correctly defined
  //   });
  //   toast("AI processing completed.");
  // };
  const onAiClick = async () => {
    toast("AI processing started...");
    if (!editor) return;

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    if (!selectedText.trim()) {
      console.warn("No text selected for AI processing.");
      return;
    }

    try {
      const result = await SearchAI({ query: selectedText, fileId: fileid });

      const UnformattedAns =
        typeof result === "string" ? JSON.parse(result) : result;
      let AllUnformattedAns =
        UnformattedAns?.map((item) => item.pageContent).join(" ") || "";

      const PROMPT = `
        For question: ${selectedText}
        and with the given content as an answer, 
        please provide an appropriate answer in HTML format.
        The answer content is: ${AllUnformattedAns}
      `;

      const AiModelResult = await chatSession.sendMessage(PROMPT);
      const aiResponseText = await AiModelResult.response.text();
      const FinalAns = aiResponseText.replace(/``|html/g, "");

      const AllText = editor.getHTML();
      editor.commands.setContent(
        `${AllText}<p><strong>Answer:</strong> ${FinalAns}</p>`
      );

      if (!isLoaded) {
        console.error("Clerk user data is still loading...");
        return;
      }

      if (!isSignedIn) {
        console.error("User is not signed in, skipping saveNotes()");
        toast.error("You must be signed in to save notes.");
        return;
      }

      if (!user || !user.primaryEmailAddress?.emailAddress) {
        console.error("User data is missing, skipping saveNotes()");
        return;
      }

      console.log("Saving notes with:", {
        notes: editor.getHTML(),
        fileId: fileid,
        createdBy: user.primaryEmailAddress.emailAddress,
      });

      await saveNotes({
        notes: editor.getHTML(),
        fileId: fileid,
        createdBy: user.primaryEmailAddress.emailAddress,
      });
    } catch (error) {
      console.error("Error in AI processing:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white border border-gray-300 rounded-lg shadow-md">
      {editor && (
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-lg border ${editor.isActive("bold") ? "bg-gray-300" : "bg-white"}`}
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-lg border ${editor.isActive("italic") ? "bg-gray-300" : "bg-white"}`}
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()}
            className={`p-2 rounded-lg border ${editor.isActive("highlight", { color: "#ffc078" }) ? "bg-yellow-300" : "bg-white"}`}
          >
            <Highlighter size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded-lg border ${editor.isActive("underline") ? "bg-gray-300" : "bg-white"}`}
          >
            <UnderlineIcon size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded-lg border ${editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : "bg-white"}`}
          >
            <Heading1 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-lg border ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : "bg-white"}`}
          >
            <Heading2 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded-lg border ${editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : "bg-white"}`}
          >
            <Heading3Icon size={20} />
          </button>
          <button onClick={onAiClick} className="p-2 rounded-lg border hover:text-purple-600">
            <Sparkles />
          </button>
        </div>
      )}
    </div>
  );
}  

export default EditorExtension;
