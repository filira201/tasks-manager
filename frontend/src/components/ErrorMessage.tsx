type Props = {
  error: string | undefined;
};

export const ErrorMessage = ({ error = "" }: Props) => {
  return error && <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>;
};
