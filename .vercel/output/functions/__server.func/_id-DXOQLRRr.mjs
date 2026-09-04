import { l as getPoemById } from "./_ssr/literature-qxY3elwu.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DXOQLRRr.js
var $$splitComponentImporter = () => import("./_id-N4aHhSOP.mjs");
var Route = createFileRoute("/poems/$id")({
	head: ({ params }) => {
		const poem = getPoemById(params.id);
		return { meta: [{ title: `${poem ? poem.title : "Poem"} — Muse Books` }, {
			name: "description",
			content: poem ? `Read "${poem.title}" by ${poem.author}.` : "Read poems from Muse Books."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
