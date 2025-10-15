import { HeroUIProvider } from "@heroui/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "../store";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
};
