export const Footer = () => {
  return (
    <footer className="flex w-full h-auto items-center justify-center p-[16px_24px] border-t-1 border-t-[#11111126]">
      <p className="font-medium text-large text-default-600">Tasks Manager ©{new Date().getFullYear()}</p>
    </footer>
  );
};
