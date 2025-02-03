"use client";
import React from "react";
import { useParams } from "next/navigation";

import Workspace_header from "./_components/workspace_header";

function Workspace() {
  const { fileid } = useParams();
  return (
    <div>
      <Workspace_header />
      <div>
        <div>{/*Text Ediotr*/}</div>
        <div>{/*PDF Viewer*/}</div>
      </div>
    </div>
  );
}

export default Workspace;
