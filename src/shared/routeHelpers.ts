import { parse, format } from "url"
import { removeUndefinedValues } from "./removeUndefinedValues"

export type RootRoute = { type: "root" }
export type WelcomeRoute = { type: "welcome" }
export type FriendRoute = { type: "friend"; name?: string }
export type UnknownRoute = { type: "unknown"; url: string }

export type Route = RootRoute | WelcomeRoute | FriendRoute | UnknownRoute

export function parseRoute(url: string): Route {
	const parsed = parse(url, true)
	if (!parsed.hash || parsed.hash === "#") {
		return { type: "root" }
	}

	if (parsed.hash === "#welcome") {
		return { type: "welcome" }
	}

	if (parsed.hash === "#friend") {
		const route: FriendRoute = { type: "friend" }
		if (parsed.query.name && typeof parsed.query.name === "string") {
			route.name = parsed.query.name
		}
		return route
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
	if (route.type === "welcome") {
		return "#welcome"
	}
	if (route.type === "friend") {
		return makeUrl("#friend", { name: route.name })
	}
	return route.url
}
