import React from "react";
import dynamic from "next/dynamic";

const SwitchView = dynamic(() => import("@/app/pages/SwitchView"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="app-view flex justify-center items-center w-full h-full">
      <SwitchView />
    </main>
  );
};

export default Home;
