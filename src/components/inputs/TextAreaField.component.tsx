import type { ComponentProps } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type TextAreaFieldComponentProps = ComponentProps<"textarea"> & {
  id: string;
  label: string;
  value: string | number | undefined;
  handleChange?: (value: string) => void;
  errors?: string | string[];
};

const TextAreaFieldComponent = ({
  id,
  label,
  value,
  onChange,
  handleChange,
  errors,
  className,
  ...props
}: TextAreaFieldComponentProps) => {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        {...props}
        value={value}
        onChange={(evt) => {
          onChange?.(evt);
          handleChange?.(evt.target.value);
        }}
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

export default TextAreaFieldComponent;
