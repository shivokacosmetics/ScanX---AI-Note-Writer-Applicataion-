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
import dynamic from "next/dynamic";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
//import dynamic from "next/dynamic";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
const EditorExtension = dynamic(
  () => import("../_components/EditiorExtension"),
  {
    ssr: false,
  }
);

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });
  console.log(notes);
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
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
