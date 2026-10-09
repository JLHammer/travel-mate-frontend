import styled from "styled-components";
import { RotateCw, TriangleAlert } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { tokens } from "../../styles/theme";
import { SubmitButton } from "./form/formStyles";

/* Centered both on its own in <main> and inside a CardSection */
const ErrorStateStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${tokens.mobile.spacing.m};
  width: min(100% - 2 * ${tokens.mobile.spacing.s}, ${tokens.mobile.sizes.formWidth});
  margin: ${tokens.mobile.spacing.l} auto;
  padding: ${tokens.mobile.spacing.l};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.error};
  border-radius: ${tokens.radii.panel};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const ErrorText = styled.p`
  display: flex;
  align-items: flex-start;
  gap: ${tokens.mobile.spacing.xs};
  color: ${({ theme }) => theme.colors.headingText};
  font-size: ${tokens.mobile.fontSizes.detailsText};
  line-height: ${tokens.mobile.lineHeights.detailsText};

  & > svg {
    flex-shrink: 0;
    width: ${tokens.mobile.sizes.infoIcon};
    height: ${tokens.mobile.sizes.infoIcon};
    margin-top: 0.2em;
    color: ${({ theme }) => theme.colors.error};
  }
`;

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

// Shown instead of content that couldn't be loaded, with a button that fetches it again
export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <ErrorStateStyled role="alert">
      <ErrorText>
        <TriangleAlert />
        {message}
      </ErrorText>
      {onRetry && (
        <SubmitButton type="button" onClick={onRetry}>
          {t.errors.retry} <RotateCw />
        </SubmitButton>
      )}
    </ErrorStateStyled>
  );
};
