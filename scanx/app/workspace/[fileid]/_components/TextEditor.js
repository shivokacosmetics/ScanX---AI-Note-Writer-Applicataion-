// import React from "react";
// import { useEditor } from "@tiptap/react";
// import { EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import EditiorExtension from "./EditiorExtension";
// // import Placeholder from "@tiptap/extension-placeholder";
// import Highlight from "@tiptap/extension-highlight";
// // import { EditiorExtension } from "./EditiorExtension";
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
//       <EditiorExtension editor={editor} />
//       <div>
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

// export default TextEditor;
import React from "react";
import { useEditor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtension from "./EditorExtension"; // Fixed spelling
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

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

  return (
    <div>
      <EditorExtension editor={editor} /> {/* Fixed spelling */}
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
