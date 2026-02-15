import { useState, type ComponentProps, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { finalize } from "rxjs";

import { cn } from "@/lib/utils";

import useForm from "@/hooks/useForm.hook";

import { LoginSchema, sessionService, type LoginModel } from "@/store/session";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import PinCodeComponent from "@/components/inputs/PinCode.component";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const { t } = useTranslation("login");

  const [loading, setLoading] = useState(false);

  const { data, setData, errors, displayErrors } = useForm(LoginSchema, {
    password: "",
  } satisfies LoginModel);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const err = displayErrors();
    if (err) {
      return;
    }

    setLoading(true);
    sessionService
      .login(data as LoginModel)
      .pipe(finalize(() => setLoading(false)))
      .subscribe();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("lead")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit}>
            <FieldGroup>
              <PinCodeComponent
                id="pin-code"
                label={t("pinCode")}
                pinCode={data.password}
                setPinCode={(pinCode) => setData({ password: pinCode })}
                errors={errors?.password}
              />
              <Field>
                <Button type="submit" disabled={loading}>
                  {t("buttons.login", { ns: "global" })}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
