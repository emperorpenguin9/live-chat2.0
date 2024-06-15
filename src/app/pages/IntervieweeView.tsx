"use client";
import React, { useState } from "react";
import hexoid from "hexoid";
import {
  UserEntity,
  MessageList,
  MessageInput,
  Chat,
  TypingIndicator,
} from "@pubnub/react-chat-components";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { actionCompleted } from "pubnub-demo-integration";

import ArrowUpIcon from "../assets/arrow-turn-up.svg";
import UnderlineIcon from "../assets/underline.svg";
import memberships from "../data/memberships.json";
import jsonUsers from "../data/users.json";
const users = jsonUsers as Array<UserEntity & { type: string }>;

type IntervieweeViewProps = {
  interviewee: UserEntity & { type: string };
};

const generateId = hexoid();

function IntervieweeView(props: IntervieweeViewProps): JSX.Element {
  const { interviewee } = props;
  const membership = memberships.find((m) =>
    m.members.includes(interviewee.id)
  );
  const channel = membership?.channelId;
  const companyId = membership?.members.find((id) => id !== interviewee.id);
  const company = users.find((u) => u.id === companyId);
  const [widgetOpen, setWidgetOpen] = useState(true);
  const [unread, setUnread] = useState(0);
  const onMessage = () => setUnread((c) => c + 1);
  if (!channel || !company) return <></>;

  return (
    <div
      className={`patient-view flex flex-col items-end justify-end overflow-hidden p-5 w-[440px] ${
        window.innerHeight < 750 ? "h-[680px]" : "h-[750px]"
      }`}
    >
      <header className="pb-2 mb-8 border-b border-solid border-gray-300 w-full">
        <h1 className="text-gray-400 font-bold">
          Interviewee&apos;s Interface
        </h1>
        <h2 className="text-gray-400">
          Logged in as: <strong>{interviewee.name}</strong>
        </h2>
      </header>

      <section
        className={`flex flex-col w-full rounded-xl shadow-xl overflow-hidden grow ${
          !widgetOpen && "invisible"
        }`}
      >
        <header className="px-4 h-[70px] bg-cyan-700 dark:bg-slate-700 text-white flex items-center shrink-0">
          {company.profileUrl && (
            <img
              alt={`${company.name}'s Avatar`}
              src={company.profileUrl}
              className="rounded-full w-9 h-9 mr-3"
            />
          )}

          <div className="grow">
            <p className="font-bold leading-5">{company.name}</p>
            <p className="leading-5">{company.custom?.title}</p>
          </div>

          <button
            onClick={() => setWidgetOpen(false)}
            className="w-11 h-11 rounded-full ease-in-out duration-300 hover:bg-cyan-600
                        dark:hover:bg-slate-500 active:bg-cyan-400 dark:active:bg-slate-300"
          >
            <UnderlineIcon className="inline" />
          </button>
        </header>

        <main className="flex flex-col overflow-hidden grow">
          <Chat currentChannel={channel} users={users} onMessage={onMessage}>
            <MessageList
              enableReactions
              reactionsPicker={<Picker data={emojiData} />}
              // extraActionsRenderer={(message) => (
              //   <div
              //     onClick={() => {
              //       onReply(message);
              //     }}
              //   >
              //     <i className="material-icons-outlined"></i>
              //   </div>
              // )}
              welcomeMessages={{
                message: {
                  id: generateId(),
                  type: "welcome",
                  text: "Please open another window or tab to chat",
                },
                timetoken: (new Date().getTime() * 10000).toString(),
              }}
            />
            <TypingIndicator />
            <hr />
            <MessageInput
              typingIndicator
              fileUpload="image"
              emojiPicker={<Picker data={emojiData} />}
              sendButton={<ArrowUpIcon />}
              onSend={() => {
                actionCompleted({ action: "Send a Message as a Interviewee" });
              }}
            />
          </Chat>
        </main>
      </section>
      <button
        onClick={() => {
          setWidgetOpen(!widgetOpen);
          setUnread(0);
        }}
        style={{ backgroundImage: `url(${interviewee.profileUrl})` }}
        className={`border-[3px] duration-300 ease-in-out h-20 mt-8 relative rounded-full shadow-lg w-20
                    bg-contain border-solid dark:hover:border-slate-500 hover:border-cyan-500 shrink-0
                    ${
                      widgetOpen
                        ? "border-cyan-700 dark:border-slate-700"
                        : "border-white"
                    }
                  `}
      >
        {!widgetOpen && !!unread && (
          <span className="absolute bg-cyan-700 dark:bg-slate-500 flex font-bold h-8 items-center justify-center right-[-10px] rounded-full text-sm text-white top-[-10px] w-8">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

export default IntervieweeView;
