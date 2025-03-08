import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

function Workspace({ fileName }) {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Image src={"/ScanX_Logo.png"} alt="" width={140} height={100} />
      <h2>{fileName}</h2>
      <UserButton />
    </div>
  );
}

export default Workspace;
