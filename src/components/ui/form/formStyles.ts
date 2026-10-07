import styled, { css } from "styled-components";
import { tokens } from "../../../styles/theme";


export const FormPanel = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.m};
  width: 100%;
  max-width: ${tokens.mobile.sizes.formWidth};
  padding: ${tokens.mobile.spacing.l};
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.panel};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.headingText};
  font-weight: ${tokens.fontWeights.medium};
`;

export const fieldControl = css<{ $hasError: boolean }>`
  width: 100%;
  padding: ${tokens.mobile.spacing.xs} ${tokens.mobile.spacing.s};
  border: ${tokens.borders.width} solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${tokens.radii.input};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.headingText};
  font-size: ${tokens.mobile.fontSizes.formText};
  transition: border-color ${tokens.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    outline-offset: 1px;
  }
`;

export const Input = styled.input<{ $hasError: boolean }>`
  ${fieldControl}
  height: ${tokens.mobile.sizes.buttonHeight};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${tokens.mobile.fontSizes.small};
  font-weight: ${tokens.fontWeights.medium};
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: ${tokens.mobile.spacing.xs};
  height: ${tokens.mobile.sizes.buttonHeight};
  padding: 0 ${tokens.mobile.spacing.l};
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${tokens.mobile.fontSizes.formText};
  font-weight: ${tokens.fontWeights.semibold};
  cursor: pointer;
  transition: background-color ${tokens.transitions.fast};

  & > svg {
    width: ${tokens.mobile.sizes.linkIcon};
    height: ${tokens.mobile.sizes.linkIcon};
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  ${tokens.media.hover} {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;
