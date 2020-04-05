import { describe, it, assert } from "../test/mocha"
import { Route, formatRoute, parseRoute } from "./routeHelpers"

const examplesMap: {
	[type in Route["type"]]: Array<Extract<Route, { type: type }>>
} = {
	root: [{ type: "root" }],
	todo: [{ type: "todo", id: "1234" }],
	unknown: [{ type: "unknown", url: "www.chetcorcos.com#asdf" }],
}

describe("parseRoute <-> formatRoute", () => {
	for (const examples of Object.values(examplesMap)) {
		for (const example of examples) {
			it("route: " + example.type, () => {
				assert.deepEqual(parseRoute(formatRoute(example)), example)
			})
		}
	}
})
