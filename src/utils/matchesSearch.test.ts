import { describe, expect, it } from "vitest";
import { matchesSearch } from "./matchesSearch";

describe("matchesSearch", () => {
  it("matches everything when the query is empty or only spaces", () => {
    expect(matchesSearch("", ["Rome"])).toBe(true);
    expect(matchesSearch("   ", ["Rome"])).toBe(true);
  });

  it("ignores case", () => {
    expect(matchesSearch("ROME", ["Rome"])).toBe(true);
    expect(matchesSearch("rome", ["ROME"])).toBe(true);
  });

  it("matches part of a word", () => {
    expect(matchesSearch("cop", ["Copenhagen"])).toBe(true);
  });

  it("ignores accents in both the query and the text", () => {
    expect(matchesSearch("musee", ["Musée du Louvre"])).toBe(true);
    expect(matchesSearch("España", ["Espana"])).toBe(true);
    expect(matchesSearch("malmo", ["Malmö"])).toBe(true);
  });

  it("lets ø and æ be typed as o and ae", () => {
    expect(matchesSearch("kobenhavn", ["København"])).toBe(true);
    expect(matchesSearch("faestning", ["Akershus Fæstning"])).toBe(true);
  });

  it("lets å be typed as a", () => {
    expect(matchesSearch("arhus", ["Århus"])).toBe(true);
  });

  it("needs every word, but they may come from different fields", () => {
    expect(matchesSearch("rome italy", ["Rome", "Italy"])).toBe(true);
    expect(matchesSearch("italy rome", ["Rome", "Italy"])).toBe(true);
    expect(matchesSearch("rome spain", ["Rome", "Italy"])).toBe(false);
  });

  it("skips missing fields", () => {
    expect(matchesSearch("rome", [null, "Rome", undefined])).toBe(true);
    expect(matchesSearch("rome", [null, undefined])).toBe(false);
  });

  it("finds an attraction by its translated category label", () => {
    expect(matchesSearch("museum", ["Louvre", "Museum", "Paris"])).toBe(true);
    expect(matchesSearch("vartegn", ["Rundetårn", "Vartegn"])).toBe(true);
  });
});
