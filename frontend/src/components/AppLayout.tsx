import { Outlet } from "react-router";

import { Footer, Header } from "@/components";

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen h-full min-w-screen w-full">
      <Header />
      <main className="flex-1 mx-auto max-w-[1252px] w-full p-[10px_round(up,_1.22223%,_.2rem)] sm:p-[15px_round(up,_3.22223%,_.2rem)] lg:p-[20px_round(up,_7.22223%,_.2rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
