import { Providers } from "./providers/Providers";
import { AppRouter } from "./routes";

export const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};
