import { Select as HeroUISelect, SelectItem as HeroUISelectItem } from "@heroui/react";
import { type Control, type FieldValues, type Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: readonly string[];
  description?: string;
  isRequired?: boolean;
};

export const Select = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  description,
  isRequired = true,
}: Props<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: isRequired ? { required: `Поле ${label} обязательно` } : undefined,
  });

  return (
    <HeroUISelect
      ref={field.ref}
      label={label}
      description={description}
      isRequired={isRequired}
      name={name}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      validationBehavior="aria"
      selectedKeys={field.value ? [field.value] : []}
      onBlur={field.onBlur}
      onChange={field.onChange}
      onSelectionChange={(keys) => {
        const next = Array.from(keys)[0] ?? "";
        field.onChange(next);
      }}
    >
      {options.map((option) => (
        <HeroUISelectItem key={option}>{option}</HeroUISelectItem>
      ))}
    </HeroUISelect>
  );
};
