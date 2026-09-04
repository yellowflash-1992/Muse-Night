import { o as getChapbookById } from "./_ssr/literature-qxY3elwu.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CrZ2GHCE.js
var $$splitComponentImporter = () => import("./_id-fS6tEpQQ.mjs");
var Route = createFileRoute("/books/$id")({
	head: ({ params }) => {
		const book = getChapbookById(params.id);
		return { meta: [{ title: `${book ? book.title : "Chapbook"} — Muse Books` }, {
			name: "description",
			content: book ? `${book.title} by ${book.author}. ${book.edition}.` : "Hand-bound chapbook by Muse Books."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
