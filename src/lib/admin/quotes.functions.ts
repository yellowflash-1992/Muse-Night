import { createServerFn } from "@tanstack/react-start";

import { createQuote, deleteQuote, listQuotes, updateQuote } from "./quotes.server";

export const listQuotesFn = createServerFn({ method: "GET" }).handler(async () => listQuotes());
export const createQuoteFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { text: string; author?: string; sortOrder?: number };
    if (typeof obj?.text !== "string" || !obj.text.trim()) throw new Error("text required");
    return obj;
  })
  .handler(async ({ data }) => createQuote(data.text, data.author, data.sortOrder));
export const updateQuoteFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as {
      id: string;
      text?: string;
      author?: string;
      status?: string;
      sortOrder?: number;
    };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return obj;
  })
  .handler(async ({ data }) => updateQuote(data.id, data));
export const deleteQuoteFn = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id) throw new Error("id required");
    return id;
  })
  .handler(async ({ data }) => deleteQuote(data));
