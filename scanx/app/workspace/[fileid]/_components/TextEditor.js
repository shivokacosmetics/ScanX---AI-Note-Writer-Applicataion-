import React from "react";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });
  return (
    <div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
