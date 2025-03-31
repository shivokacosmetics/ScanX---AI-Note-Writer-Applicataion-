"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.pdfStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(fileList);
  
  return (
    <div>
      <h2 className="font-medium text-4xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList?.length>0?fileList?.map((file, index) => (
          <Link key={file.fileId}  href={'/workspace/'+file.fileId}>
            <div className="flex p-5 shadow-md rounded-md flex-col items-col justify-center border cursor-pointer hover:scale-105 transition-all">
              <Image src="/pdf.png" alt="file" width={70} height={70} />
              <h2 className="mt-10 font-medium">{file?.fileName}</h2>
            </div>
            </Link>
          ))
        :[1,2,3,4,6].map((item,index)=>(
          <div key={index} className="bg-slate-200 rounded-md h-[150px] animate-pulse"></div>
        ))
        }
      </div>
    </div>
  );
}

export default Dashboard;

// "use client";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { api } from "../../convex/_generated/api";

// function Dashboard() {
//   const { user } = useUser();
//   const [userEmail, setUserEmail] = useState(null);

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       setUserEmail(user.primaryEmailAddress.emailAddress);
//     }
//   }, [user]);

//   const fileList = useQuery(
//     api.pdfStorage.GetUserFiles,
//     userEmail ? { userEmail } : undefined
//   );

//   console.log("User Email:", userEmail);
//   console.log("File List:", fileList);

//   if (fileList === undefined) {
//     return <p>Loading files...</p>;
//   }

//   return (
//     <div>
//       <h2 className="font-medium text-4xl">Workspace</h2>
//       <div>
//         {fileList.length > 0 ? (
//           fileList.map((file, index) => (
//             <div key={index}>
//               <Image src="/pdf.png" alt="PDF File" width={70} height={70} />
//               <p>{file.fileName}</p>
//             </div>
//           ))
//         ) : (
//           <p>No files found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
