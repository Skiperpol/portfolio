import { Fragment, type CSSProperties } from "react";

/** Wraps each word in a mask so it can slide up on its own (see .word in globals.css). */
export function SplitWords({
  text,
  wordClassName = "",
  offset = 0,
}: {
  text: string;
  wordClassName?: string;
  /** Index of the first word, to continue a stagger across several calls. */
  offset?: number;
}) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="word-mask">
        <span className={`word ${wordClassName}`} style={{ "--i": i + offset } as CSSProperties}>
          {word}
        </span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}
