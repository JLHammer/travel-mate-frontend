import { describe, expect, it } from "vitest";
import { SEGMENTS, languageOfPath, localizedPaths, translatePath } from "./routes";
import { LANGUAGES } from "../i18n/translations";

const languages = LANGUAGES.map(({ id }) => id);
const sections = Object.keys(SEGMENTS.en) as (keyof typeof SEGMENTS.en)[];

describe("SEGMENTS", () => {
  it("never uses a section name twice, so a URL always tells its language", () => {
    const all = languages.flatMap((language) => Object.values(SEGMENTS[language]));
    expect(new Set(all).size).toBe(all.length);
  });

  it("only uses lowercase ASCII, so URLs never need percent-encoding", () => {
    for (const language of languages) {
      for (const segment of Object.values(SEGMENTS[language])) {
        expect(segment).toMatch(/^[a-z-]+$/);
      }
    }
  });
});

describe("localizedPaths", () => {
  it("builds list and detail paths in each language", () => {
    expect(localizedPaths("da").countries).toBe("/lande");
    expect(localizedPaths("da").country("italien")).toBe("/lande/italien");
    expect(localizedPaths("en").city("rome")).toBe("/cities/rome");
    expect(localizedPaths("es").attraction("coliseo")).toBe("/atracciones/coliseo");
  });

  it("keeps the front page at / in every language", () => {
    for (const language of languages) {
      expect(localizedPaths(language).home).toBe("/");
    }
  });

  it("trims and encodes the search query", () => {
    expect(localizedPaths("en").searchFor("  rome  ")).toBe("/search?q=rome");
    expect(localizedPaths("en").searchFor("new york")).toBe("/search?q=new+york");
    expect(localizedPaths("da").searchFor("æble")).toBe("/soeg?q=%C3%A6ble");
  });
});

describe("languageOfPath", () => {
  it("reads the language from the first section", () => {
    expect(languageOfPath("/lande")).toBe("da");
    expect(languageOfPath("/countries/italy")).toBe("en");
    expect(languageOfPath("/atracciones/coliseo")).toBe("es");
  });

  it("returns null for the front page and unknown paths", () => {
    expect(languageOfPath("/")).toBeNull();
    expect(languageOfPath("/does-not-exist")).toBeNull();
  });

  it("knows every section in every language", () => {
    for (const language of languages) {
      for (const section of sections) {
        expect(languageOfPath(localizedPaths(language)[section])).toBe(language);
      }
    }
  });
});

describe("translatePath", () => {
  it("translates the section and keeps the slug for the detail page to swap", () => {
    expect(translatePath("/countries/italy", "da")).toBe("/lande/italy");
  });

  it("keeps the query string, both after the section and after a slug", () => {
    expect(translatePath("/soeg?q=rom", "en")).toBe("/search?q=rom");
    expect(translatePath("/attractions/x?q=y", "da")).toBe("/seevaerdigheder/x?q=y");
  });

  it("leaves the front page and unknown paths alone", () => {
    expect(translatePath("/", "es")).toBe("/");
    expect(translatePath("/does-not-exist", "da")).toBe("/does-not-exist");
  });

  it("returns the same path when the language doesn't change", () => {
    expect(translatePath("/lande/italien", "da")).toBe("/lande/italien");
  });

  it("goes between every pair of languages for every section", () => {
    for (const from of languages) {
      for (const to of languages) {
        for (const section of sections) {
          expect(translatePath(localizedPaths(from)[section], to)).toBe(
            localizedPaths(to)[section],
          );
        }
      }
    }
  });
});
