import * as React from "react"
import "./App.css"
import { Router } from "./components/Router"
import { TodoList } from "./components/TodoList"
import { TodoPage } from "./components/TodoPage"

export function App() {
	return (
		<Router>
			{({ route }) => {
				if (route.type === "root") {
					return <TodoList />
				}

				if (route.type === "todo") {
					return <TodoPage route={route} />
				}

				if (route.type === "unknown") {
					return <div>404</div>
				}
			}}
		</Router>
	)
}
