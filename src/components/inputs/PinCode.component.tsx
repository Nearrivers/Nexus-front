import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldError, FieldLabel } from "../ui/field";
import type { HTMLInputTypeAttribute } from "react";

type PinCodeComponentProps = {
  pinCode?: string;
  setPinCode?: (pinCode: string) => void;
  errors?: string | string[];
  label: string;
  id: string;
  disabled?: boolean;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};

const PinCodeComponent = ({
  id,
  label,
  errors,
  pinCode,
  required,
  disabled,
  setPinCode,
  type = "password",
}: PinCodeComponentProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputOTP
        id={id}
        maxLength={9}
        type={type}
        value={pinCode}
        disabled={disabled}
        required={required}
        onChange={(newValue) => setPinCode?.(newValue)}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} type={type} />
          <InputOTPSlot index={1} type={type} />
          <InputOTPSlot index={2} type={type} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} type={type} />
          <InputOTPSlot index={4} type={type} />
          <InputOTPSlot index={5} type={type} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={6} type={type} />
          <InputOTPSlot index={7} type={type} />
          <InputOTPSlot index={8} type={type} />
        </InputOTPGroup>
      </InputOTP>
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

export default PinCodeComponent;
