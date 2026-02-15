import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "../ui/field";

type SelectItemModel<T extends string> = {
  label: string;
  value: T;
};

type SelectComponentProps<T extends string> = {
  value?: T;
  id: string;
  label: string;
  placeholder: string;
  errors?: string | string[];
  handleChange: (value: T) => void;
  selectItems: SelectItemModel<T>[];
};

const SelectComponent = <T extends string>({
  id,
  label,
  value,
  errors,
  selectItems,
  placeholder,
  handleChange,
}: SelectComponentProps<T>) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((si) => (
            <SelectItem
              key={si.value}
              className="flex flex-col items-start"
              value={si.value}
            >
              {si.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

export default SelectComponent;
