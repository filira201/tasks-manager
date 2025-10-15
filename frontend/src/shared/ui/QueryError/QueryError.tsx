import { Button } from "@heroui/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router";

type Props = {
  error: FetchBaseQueryError | { message?: string } | undefined;
  onRetry?: () => void;
};

export const QueryError = ({ error, onRetry }: Props) => {
  const navigate = useNavigate();
  let title = "Ошибка";
  let message = "Что-то пошло не так";

  if (!error) {
    return null;
  }

  if ("status" in error) {
    title = `Ошибка ${error.status}`;

    if (typeof error.data === "string") {
      message = error.data;
    } else if (
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      message = error.data.message;
    } else {
      message = JSON.stringify(error.data);
    }
  } else if ("message" in error && error.message) {
    message = error.message;
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-red-400 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-red-700 mb-2">{title}</h2>
      <p className="text-red-600 mb-4 whitespace-pre-wrap">{message}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {onRetry && (
          <Button color="danger" variant="flat" onPress={onRetry} fullWidth className="text-lg">
            Попробовать снова
          </Button>
        )}
        <Button onPress={() => navigate("/")} color="primary" fullWidth className="text-lg">
          Главная
        </Button>
      </div>
    </div>
  );
};
