import { useState, type ComponentProps, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
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
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import TextFieldComponent from "@/components/inputs/TextField.component";
import PasswordComponent from "@/components/inputs/Password.component";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const { t } = useTranslation("login");

  const [loading, setLoading] = useState(false);

  const { data, setData, errors, displayErrors } = useForm(LoginSchema, {
    email: "a.fourcade65@gmail.com",
    password: "Ae$2f3lk",
  } satisfies LoginModel);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const err = displayErrors();
    if (err) {
      console.log(err);
      return;
    }

    setLoading(true);
    sessionService
      .login(data as LoginModel)
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: () => {
          console.log("ok");
        },
      });
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
              <TextFieldComponent
                required
                id="email"
                type="email"
                label={t("email")}
                value={data.email}
                errors={errors?.email}
                placeholder="example@mail.com"
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    email: value,
                  }))
                }
              />
              <PasswordComponent
                required
                id="password"
                label={t("password")}
                value={data.password}
                errors={errors?.password}
                placeholder={t("password")}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    password: value,
                  }))
                }
              />
              <Field>
                <Button type="submit" disabled={loading}>
                  {t("buttons.login", { ns: "global" })}
                </Button>
                <FieldDescription className="text-center">
                  {t("noAccount")} <Link to="/signup">{t("signUp.link")}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
