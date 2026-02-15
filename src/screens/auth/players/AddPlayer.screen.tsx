import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { finalize } from "rxjs";

import useForm from "@/hooks/useForm.hook";
import useTypedNavigate from "@/hooks/useTypedNavigate.hook";

import { AUTH_ROUTES } from "@/@types/route-path";

import {
  PlayerSchema,
  playerService,
  type PlayerFormModel,
} from "@/store/players";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import PinCodeComponent from "@/components/inputs/PinCode.component";
import CheckboxComponent from "@/components/inputs/Checkbox.component";
import TextFieldComponent from "@/components/inputs/TextField.component";

const AddPlayerScreen = () => {
  const { t } = useTranslation("players");
  const navigate = useTypedNavigate();

  const [loading, setLoading] = useState(false);

  const { data, setData, errors, displayErrors } = useForm(
    undefined,
    PlayerSchema,
    {
      class: undefined,
      is_admin: false,
      name: undefined,
      pinCode: undefined,
      total_experience: 0,
    } as Partial<PlayerFormModel>,
  );

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const err = displayErrors();
    if (err) {
      console.log(err);
      return;
    }

    setLoading(true);
    playerService
      .createPlayer(data)
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: () => navigate(AUTH_ROUTES.home),
      });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>{t("form.title")}</CardTitle>
            <CardDescription>{t("form.lead")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="player-form" noValidate onSubmit={handleSubmit}>
              <FieldGroup>
                <TextFieldComponent
                  id="name"
                  required
                  disabled={loading}
                  label={t("form.name")}
                  value={data.name}
                  handleChange={(name) =>
                    setData((state) => ({
                      ...state,
                      name,
                    }))
                  }
                  errors={errors?.name}
                />
                <TextFieldComponent
                  id="class-name"
                  required
                  disabled={loading}
                  label={t("form.className")}
                  value={data.class}
                  handleChange={(cl) =>
                    setData((state) => ({
                      ...state,
                      class: cl,
                    }))
                  }
                  errors={errors?.class}
                />
                <TextFieldComponent
                  id="xp"
                  required
                  disabled={loading}
                  type="number"
                  label={t("form.totalXP")}
                  value={data.total_experience}
                  handleChange={(xp) => {
                    console.log(xp, +xp);

                    setData((state) => ({
                      ...state,
                      total_experience: +xp,
                    }));
                  }}
                  errors={errors?.total_experience}
                />
                <PinCodeComponent
                  id="pinCode"
                  type="text"
                  disabled={loading}
                  label={t("form.pinCode")}
                  pinCode={data.pinCode}
                  setPinCode={(pinCode) =>
                    setData((state) => ({
                      ...state,
                      pinCode,
                    }))
                  }
                  errors={errors?.pinCode}
                />
                <CheckboxComponent
                  id="isAdmin"
                  label={t("form.isAdmin")}
                  disabled={loading}
                  checked={data.is_admin}
                  handleChange={(checked) =>
                    setData((state) => ({
                      ...state,
                      is_admin: !!checked,
                    }))
                  }
                />
                <Field>
                  <Button form="player-form" type="submit" disabled={loading}>
                    {t("buttons.createPlayer", { ns: "global" })}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddPlayerScreen;
