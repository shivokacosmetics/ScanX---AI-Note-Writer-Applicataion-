"use client";
import { Button } from "../components/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "./../convex/_generated/api";
import { useEffect } from "react";
import Image from "next/image";
import { Popover,
  PopoverContent,
  PopoverTrigger} from "../components/components/ui/popover";
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../components/components/ui/input-otp";
  

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
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
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
      <Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent><Button>Hello</Button></PopoverContent>
</Popover>

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>



      {/* <Carousel></Carousel> */}
    </div>
  );
}
