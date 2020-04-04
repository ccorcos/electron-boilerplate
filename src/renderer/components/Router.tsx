import * as React from "react"
import { Route, parseRoute, formatRoute } from "../../shared/routeHelpers"

interface RouterContext {
	navigate: (route: Route) => void
	back: () => void
}

const RouterContext = React.createContext<RouterContext>({
	navigate: () => {},
	back: () => {},
})

export const useRouter = () => React.useContext(RouterContext)

type HistoryState = {
	scrollTop: number
}

type RouterState = {
	route: Route
	historyState: HistoryState | undefined
}

export function Router(props: {
	children: (routerState: RouterState) => React.ReactNode
}) {
	const initialState = React.useMemo(() => {
		const historyState: HistoryState | undefined = window.history.state
		const route = parseRoute(window.location.href)
		return { route, historyState }
	}, [])

	const [state, setState] = React.useState<RouterState>(initialState)

	React.useEffect(() => {
		window.onpopstate = (event: PopStateEvent) => {
			const url = window.location.href
			const route = parseRoute(url)
			const historyState: HistoryState | undefined = event.state
			setState({ historyState, route })
		}
	}, [setState])

	const navigate = React.useCallback(
		(route: Route, historyState?: HistoryState) => {
			window.history.pushState(historyState, "", formatRoute(route))
			setState({ historyState, route })
		},
		[setState]
	)

	const back = React.useCallback(() => {
		window.history.back()
	}, [])
	return (
		<RouterContext.Provider value={{ navigate, back }}>
			{props.children(state)}
		</RouterContext.Provider>
	)
}
