import * as React from "react"

type HistoryState = {
	scrollTop: number
}

type RouterState<Route> = {
	historyState: HistoryState | undefined
	route: Route
}

export interface RouterFunctions<Route> {
	route: Route
	historyState: HistoryState | undefined
	navigate: (route: Route) => void
}

interface RouterProps<Route> {
	parseRoute: (url: string) => Route
	formatRoute: (route: Route) => string
	children: (props: RouterFunctions<Route>) => React.ReactNode
}

export class Router<Route> extends React.PureComponent<RouterProps<Route>> {
	state: RouterState<Route>

	constructor(props: RouterProps<Route>) {
		super(props)
		const historyState: HistoryState | undefined = window.history.state
		const route = props.parseRoute(window.location.href)
		this.state = { historyState, route }
		window.onpopstate = (event) => {
			const url = window.location.href
			const route = props.parseRoute(url)
			const historyState: HistoryState | undefined = event.state
			this.setState({ historyState, route })
		}
	}

	render() {
		return this.props.children({ ...this.state, navigate: this.navigate })
	}

	navigate = (route: Route, historyState?: HistoryState) => {
		window.history.pushState(historyState, "", this.props.formatRoute(route))
		this.setState({ historyState, route })
	}
}
