import * as React from "react"
import { Page, Heading, Button } from "./UI"
import { TodoRoute } from "../../shared/routeHelpers"
import { useRouter } from "./Router"

export function TodoPage(props: { route: TodoRoute }) {
	const { back } = useRouter()

	return (
		<Page>
			<Heading>Todo</Heading>
			{props.route.id}
			<Button onClick={back}>Back</Button>
		</Page>
	)
}
