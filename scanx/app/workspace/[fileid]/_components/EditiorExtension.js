import React from "react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Bold,Heading1,Heading2,Heading3Icon,Highlighter,Italic,UnderlineIcon} from "lucide-react";

function EditorExtension({ editor }) {
  return (
    <div className="button-group">
      <div className="control-group flex gap-20">
        <div className="button-group ">
          {editor && ( // Conditionally render when editor is available
            <div>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;