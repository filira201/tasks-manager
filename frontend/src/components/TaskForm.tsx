import { Button, Form } from "@heroui/react";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { TextareaField } from "./TextareaField";

import { type Task, TASK_CATEGORY, TASK_PRIORITY, TASK_STATUS } from "@/lib";

type Props = {
  initialValues?: Partial<Task>;
  onSubmit: (data: Task) => void | Promise<void>;
  isLoading?: boolean;
  submitText: string;
  cancelText?: string;
  onCancel?: () => void;
};

export const TaskForm = ({
  initialValues,
  onSubmit,
  isLoading,
  submitText,
  cancelText = "Отмена",
  onCancel,
}: Props) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      category: initialValues?.category ?? ("" as unknown as (typeof TASK_CATEGORY)[number]),
      status: initialValues?.status ?? ("" as unknown as (typeof TASK_STATUS)[number]),
      priority: initialValues?.priority ?? ("" as unknown as (typeof TASK_PRIORITY)[number]),
    },
  });

  const handleFormSubmit = async (data: Task) => {
    try {
      await onSubmit(data);
    } catch {
      setError("root", {
        message: "Что-то пошло не так, попробуйте снова",
      });
    }
  };

  return (
    <Form
      className="mx-auto w-full flex flex-col gap-4 py-8 px-5 rounded-2xl sm:w-4/5 sm:max-w-3xl bg-content1 shadow-lg border border-divider"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InputField name="title" label="Заголовок" placeholder="Введите заголовок" control={control} />

      <TextareaField name="description" label="Описание" placeholder="Введите описание" control={control} />

      <SelectField
        control={control}
        name="category"
        label="Категория"
        description="Выберите категорию"
        options={TASK_CATEGORY}
      />
      <SelectField control={control} name="status" label="Статус" description="Выберите статус" options={TASK_STATUS} />
      <SelectField
        control={control}
        name="priority"
        label="Приоритет"
        description="Выберите приоритет"
        options={TASK_PRIORITY}
      />

      <ErrorMessage error={errors.root?.message} />

      <div className="w-full grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 sm:gap-6">
        <Button type="button" variant="flat" color="danger" onPress={onCancel} fullWidth>
          {cancelText}
        </Button>
        <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
          {submitText}
        </Button>
      </div>
    </Form>
  );
};
