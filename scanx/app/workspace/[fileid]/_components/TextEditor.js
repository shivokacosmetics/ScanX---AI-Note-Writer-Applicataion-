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

// import dynamic from "next/dynamic";

// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Highlight from "@tiptap/extension-highlight";
// import Underline from "@tiptap/extension-underline";
// //import dynamic from "next/dynamic";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// const EditorExtension = dynamic(
//   () => import("../_components/EditiorExtension"),
//   {
//     ssr: false,
//   }
// );

// function TextEditor({ fileId }) {
//   const notes = useQuery(api.notes.GetNotes, {
//     fileId: fileId,
//   });
//   console.log(notes);
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
//   useEffect(() => {
//     if (editor && notes !== undefined) {
//       editor.commands.setContent(notes || ""); // Set content only if notes exist
//     }
//   }, [notes, editor]);

//   if (!editor) return <p>Loading editor...</p>; // Prevent errors if `editor` is null

//   return (
//     <div>
//       <EditorExtension editor={editor} />
//       <div className="overflow-scroll h-[88vh]">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

// export default TextEditor;

// import dynamic from "next/dynamic";
// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Highlight from "@tiptap/extension-highlight";
// import Underline from "@tiptap/extension-underline";
// import { useQuery } from "convex/react";
// import { api } from "../../../../convex/_generated/api";

// const EditorExtension = dynamic(
//   () => import("../_components/EditiorExtension"),
//   {
//     ssr: false,
//   }
// );

// function TextEditor({ fileId }) {
//   const notes = useQuery(api.notes.GetNotes, { fileId }) || ""; // Ensure notes is never undefined
//   console.log("Fetched notes:", notes);

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

//   useEffect(() => {
//     if (editor && notes !== undefined) {
//       editor.commands.setContent(notes || ""); // Set content only if notes exist
//     }
//   }, [notes, editor]);

//   if (!editor) return <p>Loading editor...</p>;
//   if (!notes) return <p>Loading notes...</p>; // Handle loading state

//   return (
//     <div>
//       <EditorExtension editor={editor} />
//       <div className="overflow-scroll h-[88vh]">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

// export default TextEditor;

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const EditorExtension = dynamic(
  () => import("../_components/EditiorExtension"),
  { ssr: false }
);

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, { fileId }); // Get saved notes
  const saveNotes = useMutation(api.notes.AddNotes); // Save notes to DB
  const [isSaving, setIsSaving] = useState(false); // ✅ Initialize state here

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolors: true }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
    editorProps: { attributes: { class: "focus:outline-none h-screen p-5" } },
  });

  // Load content when notes change
  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  // // Function to save data on button click
  // const handleSave = async () => {
  //   if (!editor) return;

  //   setIsSaving(true); // Show saving state
  //   const content = editor.getHTML(); // Get editor content

  //   try {
  //     await saveNotes({
  //       fileId,
  //       notes: content,
  //       createdBy: "user-id-placeholder", // 🔥 Replace this with actual user ID
  //     });

  //     alert("Saved successfully! ✅");
  //   } catch (error) {
  //     console.error("Save failed:", error);
  //     alert("Error saving data. ❌");
  //   } finally {
  //     setIsSaving(false); // Reset saving state
  //   }
  // };

  if (!editor) return <p>Loading editor...</p>; // Prevent errors

  return (
    <div>
      {/* Save Button
      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </button> */}

      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[80vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
