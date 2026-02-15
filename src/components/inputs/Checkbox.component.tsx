import type { ComponentProps } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

type CheckboxComponentProps = ComponentProps<"input"> & {
  id?: string;
  label?: string;
  value?: boolean | undefined;
  handleChange?: (value: boolean) => void;
  errors?: string | string[];
};

const CheckboxComponent = (props: CheckboxComponentProps) => {
  const { id, label, value, handleChange, errors, disabled, required } = props;

  return (
    <Field>
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          required={required}
          disabled={disabled}
          value={value}
          onCheckedChange={(checked) => handleChange?.(!!checked)}
        />
        <Label className="block" htmlFor={id}>
          {label}
        </Label>
      </div>
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

export default CheckboxComponent;
