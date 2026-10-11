import { describe, expect, it } from "vitest";
import { toAnchor } from "./toAnchor";

describe("toAnchor", () => {
  it("turns a heading into lowercase words joined by dashes", () => {
    expect(toAnchor("Information we collect")).toBe("information-we-collect");
  });

  it("spells out Danish letters and drops accents", () => {
    expect(toAnchor("Sådan bruger vi dine oplysninger")).toBe("saadan-bruger-vi-dine-oplysninger");
    expect(toAnchor("Información que recopilamos")).toBe("informacion-que-recopilamos");
  });

  it("drops apostrophes and punctuation at the ends", () => {
    expect(toAnchor("What’s stored? ")).toBe("whats-stored");
  });
});
