"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { UserEntity } from "@pubnub/react-chat-components";
import { actionCompleted } from "pubnub-demo-integration";
import UserIcon from "../../../public/assets/user.svg";
import Spinner from "../../../public/assets/spinner.svg";
import jsonUsers from "@/app/data/users.json";
const users = jsonUsers as Array<UserEntity & { type: string }>;

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

type LoginViewProps = {
  setUser: (user: UserEntity & { type: string }) => void;
};

export default function LoginView(props: LoginViewProps): JSX.Element {
  const { setUser } = props;
  const [userInput, setUserInput] = useState(
    users[0].custom?.username as string
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await timeout(500);
    setLoading(false);
    const user = users.find((u) => u?.custom?.username === userInput);
    if (user) {
      setUser(user);
      actionCompleted({
        action:
          user.type === "interviewee"
            ? "Log in as a Interviewee"
            : "Log in as a Company (in a new tab)",
      });
    } else setError(true);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (error) setError(false);
    setUserInput(e.target.value);
  };

  return (
    <main className="login-view flex flex-row w-full h-full dark:bg-gray-800 dark:text-gray-100">
      <section className="flex flex-col w-full">
        <header className="flex flex-col grow justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[364px] mt-16 relative"
          >
            {loading && (
              <div className="absolute w-full h-full bg-white dark:bg-gray-800 z-10 flex items-center justify-center opacity-50 pb-16">
                <Spinner />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-8">Log in</h3>
            <label className="mb-6 text-sm relative">
              Username
              <select
                name="username"
                id="user-role"
                value={userInput}
                onChange={handleChange}
                className={`block w-full rounded border px-10 py-2.5 mt-2 focus:border-blue-900
                  outline-0 dark:bg-gray-800 text-gray-700 dark:text-gray-100 appearance-none
                  ${
                    error
                      ? "border-red-700 dark:border-red-600"
                      : "border-gray-300"
                  }
                `}
              >
                {users.map((u) => (
                  <option key={u.name} value={u.custom?.username as string}>
                    {u.name} ({u.type})
                  </option>
                ))}
              </select>
              <UserIcon className="absolute left-3.5 bottom-3" />
              <span className="absolute right-3.5 bottom-3">▾</span>
            </label>

            <input
              type="submit"
              className="text-white bg-cyan-700 hover:bg-cyan-600 py-3 rounded font-semibold cursor-pointer"
              value="Log in"
            />
            <p
              className={`text-red-700 dark:text-red-600 mt-6 ${
                error ? "visible" : "invisible"
              }`}
            >
              This username is not recognized, please check valid accounts on
              the{" "}
            </p>
          </form>
        </header>

        <footer className="w-full text-center px-20 py-10 dark:bg-black bg-gray-100">
          This live chat sample app is made by Next.js, PubNub service.
        </footer>
      </section>
    </main>
  );
}
