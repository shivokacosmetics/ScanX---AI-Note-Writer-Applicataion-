import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const PdfUrl =
//   "https://optimistic-dog-721.convex.cloud/api/storage/8c1832f4-6296-41e2-af12-5169ad6967d5";
export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log(pdfUrl);
  //load pdf
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });

  //split test into small chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);
  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });
  return NextResponse.json({ Result: splitterList });
}
