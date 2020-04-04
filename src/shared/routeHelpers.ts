import { parse } from "url"

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

	if (parsed.hash.startsWith("#friend?")) {
		const name = parsed.query.name as string | undefined
		return { type: "friend", name }
	}

	return { type: "unknown", url }
}

export function formatRoute(route: Route) {
	if (route.type === "root") {
		return "#"
	}
	if (route.type === "welcome") {
		return "#welcome"
	}
	if (route.type === "friend") {
		return "#friend?name=" + route.name
	}
	return route.url
}
