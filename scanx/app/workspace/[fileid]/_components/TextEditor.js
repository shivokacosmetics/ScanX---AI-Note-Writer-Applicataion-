import React from "react";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
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
