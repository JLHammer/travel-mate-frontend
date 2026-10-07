import { z } from "zod";

export type LoginErrorKey = "emailRequired" | "emailInvalid" | "passwordRequired";

const error = (key: LoginErrorKey) => key;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, error("emailRequired"))
    .pipe(z.email(error("emailInvalid"))),
  password: z.string().min(1, error("passwordRequired")),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
