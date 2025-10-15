import { Spinner } from "@heroui/react";

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-transparent z-[1000]">
      <Spinner size="lg" label="Загрузка..." />
    </div>
  );
};
