import * as React from "react"
import { Page, Heading, Button } from "./UI"
import { useRouter } from "./Router"

export function TodoList() {
	const { back } = useRouter()

	return (
		<Page>
			<Heading>Todos</Heading>
			<Button onClick={back}>Back</Button>
		</Page>
	)
}
