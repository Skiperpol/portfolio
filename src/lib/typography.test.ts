import { describe, expect, it } from "vitest";
import { glue, glueAll } from "./typography";

const nbsp = "\u00a0";

describe("glue", () => {
  it("joins one-letter words to the next word", () => {
    expect(glue("Pracuję w domu i w biurze")).toBe(`Pracuję w${nbsp}domu i${nbsp}w${nbsp}biurze`);
  });

  it("handles a sentence start and an opening quote or bracket", () => {
    expect(glue("A potem (z kodem) „i tyle”")).toBe(`A${nbsp}potem (z${nbsp}kodem) „i${nbsp}tyle”`);
  });

  it("leaves the last letter of longer words alone", () => {
    expect(glue("od interfejsu do bazy")).toBe("od interfejsu do bazy");
  });
});

describe("glueAll", () => {
  it("glues strings in nested objects, arrays and function results", () => {
    const tree = glueAll({ title: "I build", list: ["a cat"], say: (n: number) => `${n} w tygodniu`, keep: /a b/ });
    expect(tree.title).toBe(`I${nbsp}build`);
    expect(tree.list).toEqual([`a${nbsp}cat`]);
    expect(tree.say(2)).toBe(`2 w${nbsp}tygodniu`);
    expect(tree.keep.source).toBe("a b");
  });
});
