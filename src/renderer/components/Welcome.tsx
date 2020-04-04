import * as React from "react"
import { Page, Heading, Button } from "./UI"
import { Route } from "../../shared/routeHelpers"

interface WelcomeProps {
	navigate: (route: Route) => void
}

export class Welcome extends React.PureComponent<WelcomeProps> {
	render() {
		return (
			<Page>
				<Heading>Welcome</Heading>
				<Button onClick={this.handleNavigateChet}>Chet</Button>
				{" • "}
				<Button onClick={this.handleNavigateAndrew}>Andrew</Button>
				{" • "}
				<Button onClick={this.handleNavigateMeghan}>Meghan</Button>
			</Page>
		)
	}

	private handleNavigateChet = () =>
		this.props.navigate({ type: "friend", name: "Chet" })

	private handleNavigateAndrew = () =>
		this.props.navigate({ type: "friend", name: "Andrew" })

	private handleNavigateMeghan = () =>
		this.props.navigate({ type: "friend", name: "Meghan" })
}
