// Letters that don't split into a base letter + accent, so normalize() can't simplify them
const TRANSLITERATIONS: Record<string, string> = { æ: "ae", ø: "oe", å: "aa", ß: "ss" };

// Turns a heading into an id for a #link, e.g. "Sådan bruger vi dine oplysninger" →
// "saadan-bruger-vi-dine-oplysninger". The same rules as the slugs in the Studio
export const toAnchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[æøåß]/g, (letter) => TRANSLITERATIONS[letter])
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
