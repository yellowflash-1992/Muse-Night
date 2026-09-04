import { c as getMusingById } from "./_ssr/literature-qxY3elwu.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DBGFn7oI.js
var $$splitComponentImporter = () => import("./_id-BGcWjL3H.mjs");
var Route = createFileRoute("/musings/$id")({
	head: ({ params }) => {
		const musing = getMusingById(params.id);
		return { meta: [{ title: `${musing ? musing.title : "Musing"} — Muse Books` }, {
			name: "description",
			content: musing ? musing.excerpt : "Literary essay by Muse Books."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
