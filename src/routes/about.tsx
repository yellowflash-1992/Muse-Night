import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/features/about/AboutPage";
import { listPersonsPublic } from "@/lib/people.functions";
import { getSiteSettingsFn } from "@/lib/settings.functions";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [siteSettings, persons] = await Promise.all([
      getSiteSettingsFn(),
      listPersonsPublic(),
    ]);
    return { siteSettings, persons };
  },
  head: () => ({
    meta: [
      { title: "About the Press & Poets &mdash; Muse Night" },
      {
        name: "description",
        content: "Meet the voices of Muse Night: Irshand, Child of the Wilderness, and InkbyNur.",
      },
    ],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  const { siteSettings, persons } = Route.useLoaderData();
  return <AboutPage siteSettings={siteSettings} persons={persons} />;
}
