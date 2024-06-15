"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import MoonIcon from "./assets/moon.svg";
import SunIcon from "./assets/sun.svg";
import { actionCompleted } from "pubnub-demo-integration";
import SwitchView from "./pages/SwitchView";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`app-view flex justify-center items-center w-full h-full ${
        darkMode ? "dark" : "light"
      } `}
    >
      <button
        onClick={() => {
          setDarkMode(!darkMode);
          actionCompleted({ action: "Change the Application Theme" });
        }}
        className="absolute top-0 right-0 p-4 m-8 mt-2 text-xs underline ease-in-out duration-300
        text-slate-700 hover:text-slate-700"
      >
        {darkMode ? (
          <SunIcon className="inline" />
        ) : (
          <MoonIcon className="inline" />
        )}
        <span className="ml-2">
          Switch to {darkMode ? "Light" : "Dark"} Theme
        </span>
      </button>
      <SwitchView darkMode={darkMode} />
    </main>
  );
}
