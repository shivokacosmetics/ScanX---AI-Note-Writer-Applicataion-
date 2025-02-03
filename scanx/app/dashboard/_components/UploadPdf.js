"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/components/ui/dialog";
import { Input } from "../../../components/components/ui/input";
import { Button } from "../../../components/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function UploadPdf({ children }) {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl); //const getFileUrl
  const embbedDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const OnUpload = async () => {
    setLoading(true);
    //Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("StorageId", storageId);
    // Step 3: Create a new FileEntry record in the database

    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId: storageId });
    const resp = await addFileEntry({
      fileId: fileId,
      fileName: fileName ?? "Untitled File",
      storageId: storageId,
      createBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl: fileUrl,
    });
    // console.log(resp);
    // Api call to Fetcch PDF Process data
    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResp.data.Result);
    // const embdeddresult = embbedDocument({
    //   splitText: ApiResp.data.Result,
    //   fileId: "123",
    // });
    // console.log(embdeddresult);
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <div className="flex  mt-5 gap-2 p-3 rounded-md border">
                  <h2>Select a file</h2>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => onFileSelect(event)}
                  />
                </div>
                <div className="mt-5">
                  <Input
                    placeholder="File Name"
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={OnUpload}>
              {loading ? <Loader2Icon className="animate-spin" /> : ""}
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdf;
