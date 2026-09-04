import { s as getCollectionById } from "./_ssr/literature-qxY3elwu.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-B5BexOYf.js
var $$splitComponentImporter = () => import("./_id-DXlYHKK7.mjs");
var Route = createFileRoute("/collections/$id")({
	head: ({ params }) => {
		const collection = getCollectionById(params.id);
		return { meta: [{ title: `${collection ? collection.title : "Collection"} — Muse Books` }, {
			name: "description",
			content: collection ? collection.description : "Poetry collection by Muse Books."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
