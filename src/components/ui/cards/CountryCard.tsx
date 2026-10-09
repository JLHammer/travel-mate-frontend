import styled from "styled-components";
import type { Country } from "../../../types";
import { usePaths } from "../../../hooks/usePaths";
import { CardBase, CardDescription } from "./CardBase";
import { tokens } from "../../../styles/theme";
import { flagUrl } from "../../../utils/flagUrl";

const CountryFlag = styled.img`
  flex-shrink: 0;
  width: ${tokens.mobile.sizes.flagWidth};
`;

type CountryCardProps = {
  country: Country;
};

export const CountryCard = ({ country }: CountryCardProps) => {
  const paths = usePaths();
  const { name, code, slug, tagline, description, image } = country;
  // Description is the fallback if a tagline is missing
  const summary = tagline ?? description;

  return (
    <CardBase
      to={slug ? paths.country(slug) : paths.countries}
      title={
        <>
          {code && <CountryFlag src={flagUrl(code)} alt="" />}
          {name}
        </>
      }
      image={image}
      imageAlt={name ?? ""}
    >
      {summary && <CardDescription>{summary}</CardDescription>}
    </CardBase>
  );
};
