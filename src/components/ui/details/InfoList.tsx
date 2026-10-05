import type { ReactNode } from "react";
import styled from "styled-components";
import { tokens } from "../../../styles/theme";

const InfoListStyled = styled.dl`
  border: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${tokens.radii.card};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  ${tokens.media.desktop} {
    display: flex;
    flex-direction: column;
    gap: ${tokens.desktop.spacing.m};
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.mobile.spacing.m};
  padding: ${tokens.mobile.spacing.s} ${tokens.mobile.spacing.m};

  & + & {
    border-top: ${tokens.borders.width} solid ${({ theme }) => theme.colors.border};
  }

  ${tokens.media.desktop} {
    padding: 0;

    & + & {
      border-top: none;
    }
  }
`;

const InfoIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.radii.button};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};

  width: ${tokens.mobile.sizes.infoIconBox};
  height: ${tokens.mobile.sizes.infoIconBox};

  & > svg {
    width: ${tokens.mobile.sizes.infoIcon};
    height: ${tokens.mobile.sizes.infoIcon};
  }

  ${tokens.media.desktop} {
    display: none;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.mobile.spacing.xxs};
  min-width: 0;
`;

const InfoLabel = styled.dt`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: ${tokens.mobile.fontSizes.small};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.05em;
  text-transform: uppercase;

  ${tokens.media.desktop} {
    color: ${({ theme }) => theme.colors.headingText};
    font-size: ${tokens.desktop.fontSizes.detailsText};
    font-weight: ${tokens.fontWeights.semibold};
    letter-spacing: normal;
    text-transform: none;
  }
`;

const InfoValue = styled.dd`
  color: ${({ theme }) => theme.colors.headingText};
  font-size: ${tokens.mobile.fontSizes.detailsText};
`;

export type InfoItem = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

type InfoListProps = {
  items: InfoItem[];
};

export const InfoList = ({ items }: InfoListProps) => {
  return (
    <InfoListStyled>
      {items.map(({ icon, label, value }) => (
        <InfoRow key={label}>
          <InfoIcon>{icon}</InfoIcon>
          <InfoText>
            <InfoLabel>{label}</InfoLabel>
            <InfoValue>{value}</InfoValue>
          </InfoText>
        </InfoRow>
      ))}
    </InfoListStyled>
  );
};
