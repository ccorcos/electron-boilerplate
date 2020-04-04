import "./App.css"
import { parseRoute, formatRoute } from "../shared/routeHelpers"
import { Router } from "./components/Router"
import { Redirect } from "./components/Redirect"
import { Welcome } from "./components/Welcome"

export function App() {
	return (
		<Router parseRoute={parseRoute} formatRoute={formatRoute}>
			{({ route, navigate }) => {
				if (route.type === "root") {
					return <Redirect navigate={navigate} to={{ type: "welcome" }} />
				}

				if (route.type === "welcome") {
					return <Welcome navigate={navigate} />
				}

				if (route.type === "friend") {
					return <div>friend: {route.name}</div>
				}

				if (route.type === "unknown") {
					return <div>404</div>
				}
			}}
		</Router>
	)
}
