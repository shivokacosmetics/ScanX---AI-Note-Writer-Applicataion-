// "use client";
// import { useUser } from "@clerk/nextjs";
// import { useQuery } from "convex/react";
// import React from "react";
// import { api } from "../../convex/_generated/api";
// import Image from "next/image";

// function Dashboard() {
//   const { user } = useUser();
//   const fileList = useQuery(api.pdfStorage.GetUserFiles, {
//     userEmail: user?.primaryEmailAddress?.emailAddress,
//   });
//   console.log(fileList);
//   if (fileList === undefined) {
//     return <p>Loading files...</p>;
//   }

//   return (
//     <div>
//       <h2 className="font-medium text-4xl">Workspace</h2>
//       <div>
//         {fileList &&
//           fileList?.map((file, index) => (
//             <div key={index}>
//               <Image src="/pdf.png" alt="file" width={70} height={70} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

function Dashboard() {
  const { user } = useUser();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setUserEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const fileList = useQuery(
    api.pdfStorage.GetUserFiles,
    userEmail ? { userEmail } : undefined
  );

  console.log("User Email:", userEmail);
  console.log("File List:", fileList);

  if (fileList === undefined) {
    return <p>Loading files...</p>;
  }

  return (
    <div>
      <h2 className="font-medium text-4xl">Workspace</h2>
      <div>
        {fileList.length > 0 ? (
          fileList.map((file, index) => (
            <div key={index}>
              <Image src="/pdf.png" alt="PDF File" width={70} height={70} />
              <p>{file.fileName}</p>
            </div>
          ))
        ) : (
          <p>No files found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
