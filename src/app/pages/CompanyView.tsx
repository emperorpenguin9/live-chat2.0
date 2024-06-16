"use client";
import React, { useState } from "react";
import {
  UserEntity,
  ChannelList,
  Chat,
  MessageList,
  MessageInput,
  ChannelEntity,
  TypingIndicator,
} from "@pubnub/react-chat-components";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { actionCompleted } from "pubnub-demo-integration";
import ArrowUp from "../../../public/assets/arrow-turn-up.svg";
import memberships from "../data/memberships.json";
import users from "../data/users.json";

type CompanyViewProps = {
  company: UserEntity & { type: string };
};

function CompanyView(props: CompanyViewProps): JSX.Element {
  const { company } = props;
  const companyMemberships = memberships.filter((m) =>
    m.members.includes(company.id)
  );
  const channels = companyMemberships.reduce((acc: ChannelEntity[], m) => {
    const intervieweeId = m.members.find((id) => id !== company.id);
    const interviewee = users.find((u) => u.id === intervieweeId);
    if (!interviewee) return acc;
    return [
      ...acc,
      {
        id: m.channelId,
        name: interviewee.name,
        description: `interviewee ID: ${interviewee.id}`,
        custom: {
          profileUrl: interviewee?.profileUrl,
        },
        updated: "",
        eTag: "",
      },
    ];
  }, []);
  const [currentChannel, setCurrentChannel] = useState(
    channels[1] || { id: "default" }
  );

  return (
    // <div
    //   className={`p-5 overflow-hidden w-[740px] flex flex-col ${
    //     window.innerHeight < 750 ? "h-[650px]" : "h-[750px]"
    //   }`}
    // >
    <div className={`p-5 overflow-hidden w-9/12 flex flex-col h-full`}>
      <header className="pb-2 mb-8 border-b border-solid border-gray-300">
        <h1 className="text-gray-400 font-bold">Company&apos;s Interface</h1>
        <h2 className="text-gray-400">
          Logged in as: <strong>{company.name}</strong>
        </h2>
      </header>

      <div className="flex justify-end overflow-hidden grow rounded-xl shadow-xl">
        <Chat currentChannel={currentChannel.id} users={users as UserEntity[]}>
          <aside className="flex flex-col">
            <header className="flex items-center h-[70px] justify-center text-white bg-cyan-700 dark:bg-slate-700 tracking-[2px] uppercase">
              <span>Interviewee Queue</span>
            </header>

            <nav className="bg-gray-100 dark:bg-gray-700 flex flex-col grow w-64">
              <ChannelList
                channels={channels}
                onChannelSwitched={(ch) => setCurrentChannel(ch)}
              />
            </nav>

            <footer className="bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-white text-sm px-3 h-[58px] flex items-center">
              {company.profileUrl && (
                <img
                  src={company.profileUrl}
                  className="rounded-full w-9 h-9 mr-3"
                  alt={`${company.name}'s Avatar`}
                />
              )}
              <p>{company.name}</p>
            </footer>
          </aside>

          <section className="flex flex-col grow">
            <header className="flex items-center h-[70px] justify-left pl-6 bg-cyan-500 dark:bg-slate-500 dark:text-white text-gray-800 shrink-0">
              <strong>{currentChannel.name}</strong>
            </header>

            <article className="flex flex-col grow overflow-hidden">
              <MessageList
                enableReactions
                reactionsPicker={<Picker data={emojiData} />}
                // extraActionsRenderer={(message) => (
                //   <div
                //     onClick={() => {
                //       onReply(message);
                //     }}
                //   >
                //     <span className="material-symbols-outlined">reply</span>
                //   </div>
                // )}
                welcomeMessages={{
                  message: {
                    id: "welcome-1",
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
                emojiPicker={<Picker data={emojiData} />}
                sendButton={<ArrowUp />}
                onSend={() => {
                  actionCompleted({ action: "Send a Message as a Company" });
                }}
              />
            </article>
          </section>
        </Chat>
      </div>
    </div>
  );
}

export default CompanyView;
