import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/components/ui/button";
import Link from "next/link";

function Workspace({ fileName }) {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Link href="/dashboard">
      <Image src={"/ScanX_Logo.png"} alt="" width={140} height={100} />
      </Link>
      <h2>{fileName}</h2>
      <div className="flex gap-4 items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default Workspace;
