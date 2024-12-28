"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession, signIn, signOut } from "next-auth/react";

function getFirstTwoCapitalLetters(str?: string | null) {
  const match = (str || "").match(/[A-Z]/g);
  return match ? match.slice(0, 2).join("") : "GT";
}

export default function UserButton() {
  const { data: session, status } = useSession();

  const fetchAvatar = () => {
    if (session) {
      if (session.user) {
        if (session.user.image) {
          return <AvatarImage src={session.user.image} />
        } else if (session.user.name) {
          return (
            <AvatarFallback>
              {getFirstTwoCapitalLetters(session.user.name)}
            </AvatarFallback>
          )
        } else {
          return (
            <AvatarFallback>
              ?
            </AvatarFallback>
          )
        }
      }
    }
    return null
  }

  return (
    <div>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              { fetchAvatar() }
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                signOut().then();
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
    </div>
  );
}
