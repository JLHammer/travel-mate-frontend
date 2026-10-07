import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Send } from "lucide-react";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactErrorKey,
  type ContactFormData,
  type ContactFormInput,
} from "../../schemas/contactSchema";
import { useTranslation } from "../../hooks/useTranslation";
import {
  ErrorMessage,
  Field,
  FormPanel,
  Input,
  Label,
  SubmitButton,
  fieldControl,
} from "../ui/form/formStyles";
import { tokens } from "../../styles/theme";
import { PageLayout, PageText } from "../layout/PageLayout";

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${tokens.mobile.spacing.m};

  ${tokens.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Select = styled.select<{ $hasError: boolean }>`
  ${fieldControl}
  height: ${tokens.mobile.sizes.buttonHeight};
  cursor: pointer;
`;

const Textarea = styled.textarea<{ $hasError: boolean }>`
  ${fieldControl}
  min-height: ${tokens.mobile.sizes.textareaHeight};
  resize: vertical;
  line-height: ${tokens.mobile.lineHeights.body};
`;

const SuccessMessage = styled.p`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.xs};
  padding: ${tokens.mobile.spacing.s} ${tokens.mobile.spacing.m};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.successSoft};
  color: ${({ theme }) => theme.colors.success};
  font-weight: ${tokens.fontWeights.medium};

  & > svg {
    flex-shrink: 0;
    width: ${tokens.mobile.sizes.infoIcon};
    height: ${tokens.mobile.sizes.infoIcon};
  }
`;

const sendMessage = (data: ContactFormData) =>
  new Promise<ContactFormData>((resolve) => setTimeout(() => resolve(data), 800));

export const ContactSection = () => {
  const { t } = useTranslation();
  const [sentName, setSentName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "" as ContactFormInput["subject"],
      message: "",
    },
  });

  const errorText = (message?: string) => t.contact.errors[message as ContactErrorKey];

  const onSubmit = async (data: ContactFormData) => {
    await sendMessage(data);
    setSentName(data.name);
    reset();
  };

  return (
    <PageLayout
      title={t.nav.contact}
      heading={t.contact.title}
      intro={<PageText>{t.contact.intro}</PageText>}
    >
      <FormPanel onSubmit={handleSubmit(onSubmit)} noValidate>
        {sentName && (
          <SuccessMessage>
            <CircleCheck />
            {t.contact.success(sentName)}
          </SuccessMessage>
        )}

        <FieldRow>
          <Field>
            <Label htmlFor="contact-name">{t.contact.labels.name}</Label>
            <Input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder={t.contact.placeholders.name}
              $hasError={!!errors.name}
              {...register("name")}
            />
            {errors.name && <ErrorMessage>{errorText(errors.name.message)}</ErrorMessage>}
          </Field>

          <Field>
            <Label htmlFor="contact-email">{t.contact.labels.email}</Label>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder={t.contact.placeholders.email}
              $hasError={!!errors.email}
              {...register("email")}
            />
            {errors.email && <ErrorMessage>{errorText(errors.email.message)}</ErrorMessage>}
          </Field>
        </FieldRow>

        <Field>
          <Label htmlFor="contact-subject">{t.contact.labels.subject}</Label>
          <Select id="contact-subject" $hasError={!!errors.subject} {...register("subject")}>
            <option value="" disabled>
              {t.contact.placeholders.subject}
            </option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {t.contact.subjects[subject]}
              </option>
            ))}
          </Select>
          {errors.subject && <ErrorMessage>{errorText(errors.subject.message)}</ErrorMessage>}
        </Field>

        <Field>
          <Label htmlFor="contact-message">{t.contact.labels.message}</Label>
          <Textarea
            id="contact-message"
            placeholder={t.contact.placeholders.message}
            $hasError={!!errors.message}
            {...register("message")}
          />
          {errors.message && <ErrorMessage>{errorText(errors.message.message)}</ErrorMessage>}
        </Field>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.contact.sending : t.contact.send} <Send />
        </SubmitButton>
      </FormPanel>
    </PageLayout>
  );
};
