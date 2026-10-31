import { createServerFn } from "@tanstack/react-start";

import {
  approveAccessRequest,
  createAccessRequest,
  listAccessRequests,
  rejectAccessRequest,
} from "./access-requests.server";

export const listAccessRequestsFn = createServerFn({ method: "GET" })
  .validator((status: unknown) => (typeof status === "string" ? status : undefined))
  .handler(async ({ data }) => listAccessRequests(data as never));

export const approveAccessRequestFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; role?: string };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return { id: obj.id, role: (obj.role as "ADMIN" | "EDITOR") ?? "ADMIN" };
  })
  .handler(async ({ data }) => approveAccessRequest(data.id, data.role));

export const rejectAccessRequestFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const obj = d as { id: string; reason?: string };
    if (typeof obj?.id !== "string") throw new Error("id required");
    return { id: obj.id, reason: obj.reason };
  })
  .handler(async ({ data }) => rejectAccessRequest(data.id, data.reason));

export const requestAdminAccessFn = createServerFn({ method: "POST" })
  .validator((role: unknown) => (role === "EDITOR" ? "EDITOR" : "ADMIN"))
  .handler(async ({ data }) => createAccessRequest(data));
