import { createServerFn } from "@tanstack/react-start";

import { isAdminUser } from "./auth.server";

export const isAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  return isAdminUser();
});

export const requireAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  // Throws if not admin; returns true otherwise.
  const { requireAdmin } = await import("./auth.server");
  await requireAdmin();
  return true;
});
