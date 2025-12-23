import { useTranslation } from "react-i18next";
import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, Info } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PasswordComponentProps = ComponentProps<"input"> & {
  label: string;
  placeholder: string;
  value: string | undefined;
  errors?: string | string[];
  handleChange: (value: string) => void;
};

const PasswordComponent = (props: PasswordComponentProps) => {
  const { id, value, label, errors, placeholder, handleChange } = props;

  const { t } = useTranslation("login");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor="password">{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          required
          placeholder={placeholder}
          value={value}
          onChange={(evt) => handleChange(evt.target.value)}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="bg-transparent absolute right-2 w-6! h-6 p-0 bottom-4.5 translate-y-1/2"
              onClick={() => setShowPassword((state) => !state)}
            >
              {showPassword ? (
                <EyeOff className="h-full w-full text-white" />
              ) : (
                <Eye className="h-full w-full text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {t(`signUp.${showPassword ? "hidePassword" : "showPassword"}`)}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      {!!errors && Array.isArray(errors) && (
        <div className="grid grid-cols-2 grid-flow-row gap-2">
          {errors.map((err) => (
            <FieldError className="flex items-center gap-2">
              <p className="text-xs">{err}</p>
              {err === t("fields.special", { ns: "errors" }) && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info
                      height="1rem"
                      width="1rem"
                      onClick={() => setShowPassword((state) => !state)}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("fields.helper.title", { ns: "errors" })}</p>
                    <p>{t("fields.helper.description", { ns: "errors" })}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </FieldError>
          ))}
          <FieldDescription className="col-span-2"></FieldDescription>
        </div>
      )}
      {!!errors && typeof errors === "string" && (
        <FieldError>{errors}</FieldError>
      )}
    </Field>
  );
};

export default PasswordComponent;
