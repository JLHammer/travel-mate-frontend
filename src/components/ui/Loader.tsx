import { ClipLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";
import { tokens } from "../../styles/theme";

export const Loader = () => {
  const theme = useTheme();

  return (
    <LoaderStyled>
      <ClipLoader
        color={theme.colors.primary}
        size={tokens.mobile.sizes.loader}
        cssOverride={{ borderWidth: tokens.borders.loader }}
      />
    </LoaderStyled>
  );
};

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${tokens.mobile.spacing.m};
`;
