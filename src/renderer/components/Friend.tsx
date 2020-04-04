import * as React from "react"
import { Page, Heading, Button } from "./UI"
import { FriendRoute } from "../../shared/routeHelpers"
import { useRouter } from "./Router"

export function Friend(props: { route: FriendRoute }) {
	const { back } = useRouter()

	return (
		<Page>
			<Heading>Friend</Heading>
			{props.route.name}
			<Button onClick={back}>Back</Button>
		</Page>
	)
}
