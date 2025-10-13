import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ThemeConextProvider } from "./theme/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeConextProvider>
        <App />
      </ThemeConextProvider>
    </HeroUIProvider>
  </StrictMode>
);
