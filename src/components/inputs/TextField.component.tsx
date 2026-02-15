import type { ComponentProps } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type TextFieldComponentProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  value: string | undefined;
  handleChange: (value: string) => void;
  errors?: string | string[];
};

const TextFieldComponent = (props: TextFieldComponentProps) => {
  const {
    id,
    label,
    placeholder,
    value,
    handleChange,
    type = "text",
    errors,
  } = props;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(evt) => handleChange(evt.target.value)}
      />
      {errors && (
        <>
          {typeof errors === "string" ? (
            <FieldError>{errors}</FieldError>
          ) : (
            errors.map((err) => <FieldError>{err}</FieldError>)
          )}
        </>
      )}
    </Field>
  );
};

export default TextFieldComponent;
