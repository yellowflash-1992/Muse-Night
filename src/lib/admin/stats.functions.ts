import { createServerFn } from "@tanstack/react-start";

import { getAdminStats } from "./stats.server";

export const getAdminStatsFn = createServerFn({ method: "GET" }).handler(async () =>
  getAdminStats(),
);
