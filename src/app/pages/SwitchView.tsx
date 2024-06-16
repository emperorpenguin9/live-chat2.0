"use client";
import React, { useEffect, useState } from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { UserEntity } from "@pubnub/react-chat-components";
import UnlockIcon from "../../../public/assets/unlock.svg";
import users from "@/app/data/users.json";
import IntervieweeView from "./IntervieweeView";
import CompanyView from "./CompanyView";
import LoginView from "./LoginView";

import { createPubNub } from "@/app/utils/pubnubConfig";

export default function SwitchView(): JSX.Element {
  const [user, setUser] = useState<UserEntity & { type: string }>();
  const [pubnub, setPubnub] = useState<PubNub>();

  useEffect(() => {
    if (!user) return;
    try {
      const pn = createPubNub(user.id);
      setPubnub(pn);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  if (!user) return <LoginView {...{ users, setUser }} />;
  if (!pubnub) return <></>;

  return (
    <PubNubProvider client={pubnub}>
      <button
        onClick={() => setUser(undefined)}
        className="absolute top-10 right-0 p-4 m-4 mr-8 text-xs underline ease-in-out duration-300
        text-slate-700 hover:text-slate-700"
      >
        <UnlockIcon className="inline" />
        <span className="ml-2">Log out</span>
      </button>

      {user.type === "interviewee" ? (
        <IntervieweeView interviewee={user} />
      ) : (
        <CompanyView company={user} />
      )}
    </PubNubProvider>
  );
}
