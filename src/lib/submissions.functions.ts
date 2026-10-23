import { createClient } from "@/lib/supabase/server";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSubmission } from "./submissions.server";

const createSubmissionSchema = z.object({
  title: z.string().min(1).max(200),
  manuscript: z.string().min(20).max(50000),
  submissionType: z.string().min(1).max(50),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  bio: z.string().max(2000).optional(),
  preferredPenNameId: z.string().nullable().optional(),
});

export const submitPoem = createServerFn({ method: "POST" })
  .validator((input: unknown) => createSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error("You must be signed in to submit");
    }
    return createSubmission(data, user.id);
  });
