import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "../store";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement="top-right"
        toastOffset={60}
        toastProps={{
          radius: "md",
          timeout: 2000,
          shouldShowTimeoutProgress: true,
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
};
