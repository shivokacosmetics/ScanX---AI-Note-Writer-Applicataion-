import { Layout, LayoutGridIcon, Shield } from "lucide-react";
import { Button } from "../../../components/components/ui/button";
import Image from "next/image";
import React from "react";
import { Progress } from "../../../components/components/ui/progress";

function SideBar() {
  return (
    <div className="shadow-md h-screen p-8 ">
      <Image src={"/ScanX_Logo.png"} alt="logo" width={180} height={180} />

      <div className="pt-5">
        <Button className="w-full">+ Upload PDF</Button>
      </div>
      <div className="flex gap-2 items-center p-2 mt-10 hover:bg-slate-100 rounded-lg cursor-pointer">
        <LayoutGridIcon />
        <h2>Workspace</h2>
      </div>
      <div className="flex gap-2 items-center p-2 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
        <Shield />
        <h2>Upgrade</h2>
      </div>

      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 out of 5 Pdf uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to upload more Pdf</p>
      </div>
    </div>
  );
}

export default SideBar;