import { describe, it, expect } from "vitest";
import {
  stanzasToBody,
  bodyToStanzas,
  computeExcerpt,
  computeLinesCount,
  computeReadTime,
} from "./format";

describe("stanzasToBody", () => {
  it("converts single stanza with multiple lines", () => {
    const stanzas = [["line 1", "line 2", "line 3"]];
    expect(stanzasToBody(stanzas)).toBe("line 1\nline 2\nline 3");
  });

  it("converts multiple stanzas separated by blank line", () => {
    const stanzas = [
      ["line 1", "line 2"],
      ["line 3", "line 4"],
    ];
    expect(stanzasToBody(stanzas)).toBe("line 1\nline 2\n\nline 3\nline 4");
  });

  it("handles empty stanzas array", () => {
    expect(stanzasToBody([])).toBe("");
  });

  it("handles stanza with single line", () => {
    const stanzas = [["only line"]];
    expect(stanzasToBody(stanzas)).toBe("only line");
  });

  it("preserves exact line content including punctuation", () => {
    const stanzas = [["Hello, world!", "How are you?"]];
    expect(stanzasToBody(stanzas)).toBe("Hello, world!\nHow are you?");
  });
});

describe("bodyToStanzas", () => {
  it("parses single stanza with LF line endings", () => {
    const body = "line 1\nline 2\nline 3";
    expect(bodyToStanzas(body)).toEqual([["line 1", "line 2", "line 3"]]);
  });

  it("parses multiple stanzas separated by blank line", () => {
    const body = "line 1\nline 2\n\nline 3\nline 4";
    expect(bodyToStanzas(body)).toEqual([
      ["line 1", "line 2"],
      ["line 3", "line 4"],
    ]);
  });

  it("handles Windows CRLF line endings", () => {
    const body = "line 1\r\nline 2\r\n\r\nline 3\r\nline 4";
    expect(bodyToStanzas(body)).toEqual([
      ["line 1", "line 2"],
      ["line 3", "line 4"],
    ]);
  });

  it("handles mixed CRLF and LF", () => {
    const body = "line 1\r\nline 2\n\nline 3\r\nline 4";
    expect(bodyToStanzas(body)).toEqual([
      ["line 1", "line 2"],
      ["line 3", "line 4"],
    ]);
  });

  it("handles trailing newlines", () => {
    const body = "line 1\nline 2\n\n";
    expect(bodyToStanzas(body)).toEqual([["line 1", "line 2"]]);
  });

  it("handles leading newlines", () => {
    const body = "\n\nline 1\nline 2";
    expect(bodyToStanzas(body)).toEqual([["line 1", "line 2"]]);
  });

  it("handles empty input", () => {
    expect(bodyToStanzas("")).toEqual([]);
  });

  it("handles whitespace-only input", () => {
    expect(bodyToStanzas("   \n\n  \n  ")).toEqual([]);
  });

  it("trims trailing whitespace from lines", () => {
    const body = "line 1  \nline 2\t\n\nline 3";
    expect(bodyToStanzas(body)).toEqual([["line 1", "line 2"], ["line 3"]]);
  });

  it("filters out empty lines within stanza", () => {
    const body = "line 1\n\n\nline 2\n\nline 3";
    expect(bodyToStanzas(body)).toEqual([["line 1"], ["line 2"], ["line 3"]]);
  });

  it("preserves intentional blank lines as stanza breaks", () => {
    const body = "line 1\nline 2\n\n\nline 3";
    expect(bodyToStanzas(body)).toEqual([["line 1", "line 2"], ["line 3"]]);
  });
});

describe("round-trip: stanzasToBody -> bodyToStanzas", () => {
  it("preserves simple poem", () => {
    const original = [
      ["The desk keeps its own small weather,", "a lamp the size of a held breath,"],
    ];
    const body = stanzasToBody(original);
    const parsed = bodyToStanzas(body);
    expect(parsed).toEqual(original);
  });

  it("preserves multi-stanza poem", () => {
    const original = [
      ["We do not write to be found.", "We write to leave the light on"],
      ["for whoever passes at midnight", "and wonders, briefly, at the glow."],
    ];
    const body = stanzasToBody(original);
    const parsed = bodyToStanzas(body);
    expect(parsed).toEqual(original);
  });

  it("preserves poem with trailing newline in source", () => {
    const original = [["line 1", "line 2"], ["line 3"]];
    const body = stanzasToBody(original) + "\n";
    const parsed = bodyToStanzas(body);
    expect(parsed).toEqual(original);
  });

  it("preserves poem with Windows line endings", () => {
    const original = [["line 1", "line 2"], ["line 3"]];
    const body = stanzasToBody(original).replace(/\n/g, "\r\n");
    const parsed = bodyToStanzas(body);
    expect(parsed).toEqual(original);
  });
});

describe("computeExcerpt", () => {
  it("returns first 3 lines of first stanza joined by newline", () => {
    const stanzas = [["line 1", "line 2", "line 3", "line 4"], ["line 5"]];
    expect(computeExcerpt(stanzas)).toBe("line 1\nline 2\nline 3");
  });

  it("returns all lines if first stanza has fewer than 3 lines", () => {
    const stanzas = [["line 1", "line 2"]];
    expect(computeExcerpt(stanzas)).toBe("line 1\nline 2");
  });

  it("returns empty string for empty stanzas", () => {
    expect(computeExcerpt([])).toBe("");
  });

  it("returns empty string for stanza with empty lines", () => {
    const stanzas = [["", ""]];
    expect(computeExcerpt(stanzas)).toBe("\n");
  });
});

describe("computeLinesCount", () => {
  it("counts total lines across all stanzas", () => {
    const stanzas = [
      ["line 1", "line 2"],
      ["line 3", "line 4", "line 5"],
    ];
    expect(computeLinesCount(stanzas)).toBe(5);
  });

  it("returns 0 for empty stanzas", () => {
    expect(computeLinesCount([])).toBe(0);
  });
});

describe("computeReadTime", () => {
  it("returns 1 min for small poems", () => {
    expect(computeReadTime(10)).toBe("1 min");
  });

  it("scales with line count", () => {
    expect(computeReadTime(20)).toBe("1 min");
    expect(computeReadTime(40)).toBe("2 min");
    expect(computeReadTime(200)).toBe("10 min");
  });

  it("minimum is 1 min", () => {
    expect(computeReadTime(0)).toBe("1 min");
    expect(computeReadTime(1)).toBe("1 min");
  });
});
