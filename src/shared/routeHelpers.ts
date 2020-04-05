import { parse, format } from "url"
import { removeUndefinedValues } from "./removeUndefinedValues"

export type RootRoute = { type: "root" }
export type TodoRoute = { type: "todo"; id: string }
export type UnknownRoute = { type: "unknown"; url: string }

export type Route = RootRoute | TodoRoute | UnknownRoute

export function parseRoute(url: string): Route {
	const parsed = parse(url, true)
	if (!parsed.hash || parsed.hash === "#") {
		return { type: "root" }
	}

	if (parsed.hash === "#todo") {
		if (parsed.query.id && typeof parsed.query.id === "string") {
			return { type: "todo", id: parsed.query.id }
		}
	}

	return { type: "unknown", url }
}

function makeUrl(hash: string, query: { [key: string]: string | undefined }) {
	const parsed = parse("", true)
	parsed.hash = hash
	parsed.query = removeUndefinedValues(query) as any
	return format(parsed)
}

export function formatRoute(route: Route) {
	if (route.type === "root") {
		return "#"
	}
	if (route.type === "todo") {
		return makeUrl("#todo", { id: route.id })
	}
	return route.url
}
