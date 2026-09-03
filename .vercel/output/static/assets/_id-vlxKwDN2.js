const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/_id-B1SQQRhP.js",
      "assets/createLucideIcon-BnNKfcXr.js",
      "assets/arrow-left-CaFqYGEK.js",
      "assets/arrow-right-Z_xHovhc.js",
      "assets/layers-DEWR5DJu.js",
      "assets/quote-D42mR2Vo.js",
      "assets/literature-j2lTA6at.js",
    ]),
) => i.map((i) => d[i]);
import { n as e, r as t, t as n } from "./preload-helper-BC4arR-S.js";
import { s as r } from "./literature-j2lTA6at.js";
var i = t(`/collections/$id`)({
  head: ({ params: e }) => {
    let t = r(e.id);
    return {
      meta: [
        { title: `${t ? t.title : `Collection`} — Muse Books` },
        { name: `description`, content: t ? t.description : `Poetry collection by Muse Books.` },
      ],
    };
  },
  component: e(
    () => n(() => import(`./_id-B1SQQRhP.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6])),
    `component`,
  ),
});
export { i as t };
