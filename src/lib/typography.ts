const SHORT_WORD = /(\p{L}|\p{N}+) /gu;
const WORD_START = /[\s(„"]/;
// An inflected acronym ("VPS-ie", "API-em"), which must not split at its hyphen.
const ACRONYM_SUFFIX = /(\p{Lu}{2,})-(?=\p{Ll})/gu;

/**
 * Joins one-letter words ("w", "i", "a") and numbers ("4 lata") to the next word with a
 * no-break space, so no line ends on one, and keeps inflected acronyms whole with a word joiner.
 */
export function glue(text: string): string {
  return text
    .replace(SHORT_WORD, (match, word: string, offset: number) =>
      offset === 0 || WORD_START.test(text[offset - 1]) ? `${word}\u00a0` : match,
    )
    .replace(ACRONYM_SUFFIX, "$1-\u2060");
}

/** Applies `glue` to every string in a content tree, including strings that functions return. */
export function glueAll<T>(value: T): T {
  if (typeof value === "string") return glue(value) as T;
  if (typeof value === "function") {
    return ((...args: unknown[]) => glueAll(value(...args))) as T;
  }
  if (Array.isArray(value)) return value.map(glueAll) as T;
  if (value !== null && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, glueAll(item)])) as T;
  }
  return value;
}
