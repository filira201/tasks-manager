import { Textarea } from "@heroui/react";
import { type Control, type FieldValues, type Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  isRequired?: boolean;
};

export const TextareaField = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  isRequired = false,
}: Props<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: isRequired ? { required: `Поле ${label} обязательно` } : undefined,
  });

  return (
    <Textarea
      {...field}
      ref={field.ref}
      validationBehavior="aria"
      label={label}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      placeholder={placeholder}
      isRequired={isRequired}
    />
  );
};
