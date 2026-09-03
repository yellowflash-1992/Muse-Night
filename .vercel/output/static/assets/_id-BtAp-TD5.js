const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/_id-CTgv3buW.js",
      "assets/createLucideIcon-BnNKfcXr.js",
      "assets/arrow-left-CaFqYGEK.js",
      "assets/arrow-right-Z_xHovhc.js",
      "assets/check-Dz3QWjsN.js",
      "assets/share-2-DzXqWaLc.js",
      "assets/sparkles-arFjGQUh.js",
      "assets/literature-j2lTA6at.js",
    ]),
) => i.map((i) => d[i]);
import { n as e, r as t, t as n } from "./preload-helper-BC4arR-S.js";
import { l as r } from "./literature-j2lTA6at.js";
var i = t(`/poems/$id`)({
  head: ({ params: e }) => {
    let t = r(e.id);
    return {
      meta: [
        { title: `${t ? t.title : `Poem`} — Muse Books` },
        {
          name: `description`,
          content: t ? `Read "${t.title}" by ${t.author}.` : `Read poems from Muse Books.`,
        },
      ],
    };
  },
  component: e(
    () => n(() => import(`./_id-CTgv3buW.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7])),
    `component`,
  ),
});
export { i as t };
