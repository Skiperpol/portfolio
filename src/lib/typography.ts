const ONE_LETTER_WORD = /(\p{L}) /gu;
const WORD_START = /[\s(„"]/;

/** Joins one-letter words ("w", "i", "a") to the next word with a no-break space, so no line ends on one. */
export function glue(text: string): string {
  return text.replace(ONE_LETTER_WORD, (match, letter: string, offset: number) =>
    offset === 0 || WORD_START.test(text[offset - 1]) ? `${letter}\u00a0` : match,
  );
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
