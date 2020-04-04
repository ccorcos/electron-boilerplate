import * as React from "react"
import { Page, Heading, Button, HStack } from "./UI"
import { useRouter } from "./Router"

export function Welcome() {
	const { navigate } = useRouter()

	const handleNavigateChet = React.useCallback(
		() => navigate({ type: "friend", name: "Chet" }),
		[navigate]
	)

	const handleNavigateAndrew = React.useCallback(
		() => navigate({ type: "friend", name: "Andrew" }),
		[navigate]
	)

	const handleNavigateMeghan = React.useCallback(
		() => navigate({ type: "friend", name: "Meghan" }),
		[navigate]
	)

	return (
		<Page>
			<Heading>Welcome</Heading>
			<HStack gap={4}>
				<Button onClick={handleNavigateChet}>Chet</Button>
				{"•"}
				<Button onClick={handleNavigateAndrew}>Andrew</Button>
				{"•"}
				<Button onClick={handleNavigateMeghan}>Meghan</Button>
			</HStack>
		</Page>
	)
}
