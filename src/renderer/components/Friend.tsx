import * as React from "react"
import { Page, Heading, Button } from "./UI"
import { Route, FriendRoute } from "../../shared/routeHelpers"

interface FriendProps {
	route: FriendRoute
	navigate: (route: Route) => void
}

export class Friend extends React.PureComponent<FriendProps> {
	render() {
		return (
			<Page>
				<Heading>Friend</Heading>
				{this.props.route.name}
				<Button onClick={this.handleNavigateBack}>Back</Button>
			</Page>
		)
	}

	private handleNavigateBack = () => {
		this.props.navigate({ type: "welcome" })
	}
}
