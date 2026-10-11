import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import {
  loginSchema,
  type LoginErrorKey,
  type LoginFormValues,
} from "../../../schemas/loginSchema";
import { useAuth } from "../../../hooks/useAuth";
import { useLikes } from "../../../hooks/useLikes";
import { useTranslation } from "../../../hooks/useTranslation";
import { ErrorMessage, Field, FormPanel, Input, Label, SubmitButton } from "./formStyles";
import { tokens } from "../../../styles/theme";

const LoginButton = styled(SubmitButton)`
  ${tokens.media.tabletOnly} {
    align-self: center;
  }
`;

export const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { likeAfterLogin } = useLikes();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, likeAttractionId } =
    (location.state as { from?: string; likeAttractionId?: string } | null) ?? {};
  const [hasFailed, setHasFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const errorText = (message?: string) => t.login.errors[message as LoginErrorKey];

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    likeAfterLogin(likeAttractionId ?? null);
    const user = await login(email, password);
    setHasFailed(!user);
    if (!user) likeAfterLogin(null);

    // We leave the login page right away, so show a toast to confirm the login
    if (user && from) {
      toast.success(t.login.welcomeBack(user.firstName));
      navigate(from, { replace: true });
    }
  };

  return (
    <FormPanel onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field>
        <Label htmlFor="login-email">{t.login.labels.email}</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder={t.login.placeholders.email}
          $hasError={!!errors.email}
          {...register("email")}
        />
        {errors.email && <ErrorMessage>{errorText(errors.email.message)}</ErrorMessage>}
      </Field>

      <Field>
        <Label htmlFor="login-password">{t.login.labels.password}</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder={t.login.placeholders.password}
          $hasError={!!errors.password}
          {...register("password")}
        />
        {errors.password && <ErrorMessage>{errorText(errors.password.message)}</ErrorMessage>}
      </Field>

      {hasFailed && <ErrorMessage>{t.login.invalidCredentials}</ErrorMessage>}

      <LoginButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.login.submitting : t.login.submit} <LogIn />
      </LoginButton>
    </FormPanel>
  );
};
