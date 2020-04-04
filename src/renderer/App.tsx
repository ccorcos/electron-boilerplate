import * as React from "react"
import "./App.css"
import { Router } from "./components/Router"
import { Redirect } from "./components/Redirect"
import { Welcome } from "./components/Welcome"
import { Friend } from "./components/Friend"

export function App() {
	return (
		<Router>
			{({ route }) => {
				if (route.type === "root") {
					return <Redirect to={{ type: "welcome" }} />
				}

				if (route.type === "welcome") {
					return <Welcome />
				}

				if (route.type === "friend") {
					return <Friend route={route} />
				}

				if (route.type === "unknown") {
					return <div>404</div>
				}
			}}
		</Router>
	)
}
