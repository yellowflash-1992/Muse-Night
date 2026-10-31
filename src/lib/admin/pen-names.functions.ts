import { createServerFn } from "@tanstack/react-start";

import { listLiteraryWorlds, listPenNames, listPersons } from "./pen-names.server";

export const listPenNamesAdminFn = createServerFn({ method: "GET" }).handler(async () =>
  listPenNames(),
);
export const listPersonsAdminFn = createServerFn({ method: "GET" }).handler(async () =>
  listPersons(),
);
export const listLiteraryWorldsAdminFn = createServerFn({ method: "GET" }).handler(async () =>
  listLiteraryWorlds(),
);
