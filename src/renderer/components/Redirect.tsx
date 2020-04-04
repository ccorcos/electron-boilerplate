import * as React from "react"
import { Route } from "../../shared/routeHelpers"

interface RedirectProps {
	navigate(route: Route): void
	to: Route
}

export class Redirect extends React.PureComponent<RedirectProps> {
	componentDidMount() {
		this.props.navigate(this.props.to)
	}

	render() {
		return null
	}
}
