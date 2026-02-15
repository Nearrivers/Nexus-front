import type { CheckboxProps } from "@radix-ui/react-checkbox";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

type BoxedCheckboxComponentProps = CheckboxProps & {
  label: string;
  description?: string;
};

const BoxedCheckboxComponent = ({
  label,
  description,
  ...props
}: BoxedCheckboxComponentProps) => {
  return (
    <FieldLabel>
      <Field orientation="horizontal">
        <Checkbox {...props} />
        <FieldContent>
          <FieldTitle>{label}</FieldTitle>
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </FieldLabel>
  );
};

export default BoxedCheckboxComponent;
