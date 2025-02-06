"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Workspace_header from "./_components/workspace_header";
import PdfViewer from "../../workspace/[fileid]/_components/PdfViewer";
import { useQueries } from "convex/react";
import { v } from "convex/values";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { query } from "../../../convex/_generated/server";
// import { query } from "./_generated/server";

// export const GetFileRecord = query(async ({ db }, { fileId }) => {
//   return await db.get(fileId);
// });
export const GetFileRecord = query(async ({ db }, { fileId }) => {
  return await db.get(fileId);
});

function Workspace() {
  const { fileid } = useParams();
  const fileInfo = useQuery(api.pdfStorage.GetFileRecord, {
    fileId: fileid,
  });
  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
      <Workspace_header />
      <div>
        <div>{/*Text Editor*/}</div>
        <div>
          {/*PDF Viewer*/}
          <PdfViewer />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
