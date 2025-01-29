import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

const PdfUrl =
  "https://optimistic-dog-721.convex.cloud/api/storage/940d7614-b585-4329-9fbd-9c309053255e";
export async function GET(req) {
  //load pdf
  const response = await fetch(PdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent += doc.text;
  });
  return NextResponse.json({ Result: docs });
}
