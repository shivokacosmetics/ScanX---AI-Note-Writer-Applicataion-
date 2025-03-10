"use client";
import { Button } from "../components/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "./../convex/_generated/api";
import { useEffect } from "react";
import Image from "next/image"; // Image component from Next.js

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      user && CheckUser();
    }
  }, [user]);
  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress || "", // Ensure email is not undefined
      imageUrl: user?.imageUrl || "", // Match the server-side validator
      userName: user?.fullName || "Anonymous", // Provide a fallback for the username
    });
    console.log(result);
  };
  return (
    <div>
      <p>Shree Ganesh ai namah</p>
      <UserButton />
      Hello
      <Button>Click</Button>
      <br />
      <Button>Hello</Button>
    </div>
  );
}
//
