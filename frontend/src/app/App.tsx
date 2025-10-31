import { BrowserRouter } from "react-router";

import { Providers } from "./providers/Providers";
import { AppRouter } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
      </Providers>
    </BrowserRouter>
  );
};
