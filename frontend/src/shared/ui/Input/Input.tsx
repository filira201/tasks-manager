import { Input as HeroUIInput } from "@heroui/react";
import { type Control, type FieldValues, type Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  isRequired?: boolean;
};

export const Input = <T extends FieldValues>({ name, label, control, placeholder, isRequired = true }: Props<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: isRequired ? { required: `Поле ${label} обязательно` } : undefined,
  });

  return (
    <HeroUIInput
      {...field}
      ref={field.ref}
      isRequired={isRequired}
      errorMessage={fieldState.error?.message}
      validationBehavior="aria"
      isInvalid={fieldState.invalid}
      label={label}
      placeholder={placeholder}
    />
  );
};
