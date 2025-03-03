// import React from "react";
// import { useEditor } from "@tiptap/react";
// import { EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import EditorExtension from "./EditiorExtension"; // Fixed spelling
// import Highlight from "@tiptap/extension-highlight";
// import Underline from "@tiptap/extension-underline";

// function TextEditor() {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Highlight.configure({ multicolors: true }),
//       Placeholder.configure({
//         placeholder: "Start typing...",
//       }),
//     ],
//     editorProps: {
//       attributes: {
//         class: "focus:outline-none h-screen p-5",
//       },
//     },
//   });

//   return (
//     <div>
//       <EditorExtension editor={editor} />
//       <div>
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

// export default TextEditor;

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import dynamic from "next/dynamic";

// Ensure correct import and disable SSR (for hydration errors)
const EditorExtension = dynamic(() => import("./EditorExtension"), {
  ssr: false,
});

function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolors: true }),
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

  if (!editor) return <p>Loading editor...</p>; // Prevent errors if `editor` is null

  return (
    <div>
      <EditorExtension editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TextEditor;
