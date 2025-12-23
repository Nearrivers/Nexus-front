import { useState, type ComponentProps, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { finalize } from "rxjs";

import { cn } from "@/lib/utils";

import useForm from "@/hooks/useForm.hook";

import {
  sessionService,
  SignUpSchema,
  type SignUpModel,
} from "@/store/session";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import PasswordComponent from "@/components/inputs/Password.component";
import TextFieldComponent from "@/components/inputs/TextField.component";

export function SignUpForm({ className, ...props }: ComponentProps<"div">) {
  const { t } = useTranslation("login");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { data, setData, errors, displayErrors } = useForm(SignUpSchema, {
    email: "a.fourcade65@gmail.com",
    username: "Nearrivers",
    password: "Ae$2f3lk",
    confirmPassword: "Ae$2f3lk",
  } satisfies SignUpModel);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const err = displayErrors();
    if (err) {
      console.log(err);
      return;
    }

    setLoading(true);
    sessionService
      .register(data as SignUpModel)
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: () => {
          navigate("/login");
        },
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("signUp.title")}</CardTitle>
          <CardDescription>{t("signUp.lead")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <TextFieldComponent
                id="email"
                label={t("email")}
                type="email"
                placeholder="email@example.com"
                required
                value={data.email}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    email: value,
                  }))
                }
                errors={errors?.email}
              />
              <TextFieldComponent
                id="username"
                label={t("username")}
                placeholder={t("username")}
                required
                value={data.username}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    username: value,
                  }))
                }
              />
              <PasswordComponent
                id="password"
                label={t("password")}
                placeholder={t("password")}
                value={data.password ?? ""}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    password: value,
                  }))
                }
                errors={errors?.password}
              />
              <PasswordComponent
                id="password"
                label={t("confirm")}
                placeholder={t("confirm")}
                value={data.confirmPassword ?? ""}
                handleChange={(value) =>
                  setData((state) => ({
                    ...state,
                    confirmPassword: value,
                  }))
                }
                errors={errors?.confirmPassword}
              />
              <Field>
                <Button type="submit" disabled={loading}>
                  {t("buttons.signUp", { ns: "global" })}
                </Button>
                <FieldDescription className="text-center">
                  <Link to="/login">{t("signUp.backToLogin")}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
