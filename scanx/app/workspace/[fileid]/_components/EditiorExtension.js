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
import { useAction } from "convex/react";
//import { api } from "../convex/_generated/api";
// import { api } from "../convex/_generated/api";
import { Editor } from "@tiptap/react";
import { api } from "@convex/api";

// import { useParams } from "next/router";
import { fileId } from "convex/values";
import { useParams } from "next/navigation"; // Changed from next/router
import { chatSession } from "configs/AIModel";
function EditorExtension({ editor }) {
  const { fileid } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const onAiClick = async () => {
    // AI logic
    //console.log("AI Clicked");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(selectedText);
    const result = await SearchAI({
      query: selectedText,
      fileId: fileid,
    });
    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = " ";
    UnformattedAns &&
      AllUnformattedAns.forEach((item) => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });
    const PROMPT =
      "For question :" +
      selectedText +
      " and with the given content as an answer " +
      "please give appropriate answer in HTML format . The answer content is :" +
      AllUnformattedAns;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
  };
  return (
    <div className="button-group">
      <div className="control-group flex gap-20">
        <div className="button-group ">
          {editor && ( // Conditionally render when editor is available
            <div>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                //comment is added
                className={editor.isActive("bold") ? "text-red-600" : ""}
              >
                <Bold size={24} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "text-red-600" : ""}
              >
                <Italic size={24} />
              </button>
              <button
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#ffc078" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#ffc078" })
                    ? "is-active"
                    : ""
                }
              >
                <Highlighter size={24} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "text-red-600" : ""}
              >
                <UnderlineIcon size={24} />
              </button>

              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                <Heading1 size={24} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                <Heading2 size={24} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                <Heading3Icon size={24} />
              </button>
              <button
                onClick={() => onAiClick()}
                className={"hover : text-purple-600"}
              >
                <Sparkles />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
