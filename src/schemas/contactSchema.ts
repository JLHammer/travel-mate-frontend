import { z } from "zod";

export const CONTACT_SUBJECTS = ["general", "suggestion", "correction", "other"] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export type ContactErrorKey =
  | "nameRequired"
  | "nameTooShort"
  | "nameTooLong"
  | "emailRequired"
  | "emailInvalid"
  | "subjectRequired"
  | "messageRequired"
  | "messageTooShort"
  | "messageTooLong";

const error = (key: ContactErrorKey) => key;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, error("nameRequired"))
    .min(2, error("nameTooShort"))
    .max(60, error("nameTooLong")),
  email: z
    .string()
    .trim()
    .min(1, error("emailRequired"))
    .pipe(z.email(error("emailInvalid"))),
  subject: z.enum(CONTACT_SUBJECTS, error("subjectRequired")),
  message: z
    .string()
    .trim()
    .min(1, error("messageRequired"))
    .min(10, error("messageTooShort"))
    .max(1000, error("messageTooLong")),
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormData = z.output<typeof contactSchema>;
