import type { ComponentProps } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FileFieldComponentProps = ComponentProps<"input"> & {
  label: string;
  description?: string;
  errors?: string | string[];
};

const FileFieldComponent = ({
  label,
  description,
  errors,
  ...props
}: FileFieldComponentProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
      <Input {...props} type="file" />
      {description && <FieldDescription>{description}</FieldDescription>}
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

export default FileFieldComponent;
