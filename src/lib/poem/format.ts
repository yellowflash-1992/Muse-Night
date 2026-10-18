export function stanzasToBody(stanzas: string[][]): string {
  return stanzas.map((stanza) => stanza.join("\n")).join("\n\n");
}

export function bodyToStanzas(body: string): string[][] {
  if (!body || body.trim() === "") {
    return [];
  }

  const normalized = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const stanzaBlocks = normalized.split("\n\n");

  return stanzaBlocks
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trimEnd())
        .filter((line) => line.length > 0),
    )
    .filter((stanza) => stanza.length > 0);
}

export function computeExcerpt(stanzas: string[][]): string {
  const firstStanza = stanzas[0];
  if (!firstStanza || firstStanza.length === 0) {
    return "";
  }
  return firstStanza.slice(0, 3).join("\n");
}

export function computeLinesCount(stanzas: string[][]): number {
  return stanzas.reduce((sum, stanza) => sum + stanza.length, 0);
}

export function computeReadTime(linesCount: number): string {
  const wordsPerLine = 10;
  const wordsPerMinute = 200;
  const estimatedWords = linesCount * wordsPerLine;
  const minutes = Math.max(1, Math.ceil(estimatedWords / wordsPerMinute));
  return `${minutes} min`;
}
