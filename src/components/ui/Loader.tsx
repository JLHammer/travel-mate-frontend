import { ClipLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";

export const Loader = () => {
  const theme = useTheme();

  return (
    <LoaderStyled>
      <ClipLoader
        color={theme.colors.primary}
        size={theme.mobile.sizes.loader}
        cssOverride={{ borderWidth: theme.borders.loader }}
        aria-label="Loading"
      />
    </LoaderStyled>
  );
};

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.mobile.spacing.m};
`;
