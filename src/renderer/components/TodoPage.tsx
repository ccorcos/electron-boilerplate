import * as React from "react"
import { Page, Heading, Button, Box, Input, VStack } from "./UI"
import { TodoRoute } from "../../shared/routeHelpers"
import { useRouter } from "./Router"
import { useAync } from "../hooks/useAsync"
import { api } from "../api"
import { TodoValue } from "../../shared/types"

export function TodoPage(props: { route: TodoRoute }) {
	const { back } = useRouter()

	const request = useAync(() => api.getTodo({ id: props.route.id }), [
		props.route.id,
	])

	const showSpinner = request.fetching && request.spinner
	const todo = request.data

	return (
		<Page>
			<Heading>Todo</Heading>
			<Button onClick={back}>Back</Button>
			{showSpinner && <Box>Loading...</Box>}
			{todo && <TodoEdit {...todo} />}
		</Page>
	)
}

function TodoEdit(props: TodoValue) {
	const [title, setTitle] = React.useState(props.title)
	const handleTitleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setTitle(e.currentTarget.value)
		},
		[]
	)
	const handleTitleEnter = React.useCallback(async () => {
		await api.updateTodo({ ...props, title: title })
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}, [props, title])

	const [description, setDescription] = React.useState(props.description)
	const handleDescriptionChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setDescription(e.currentTarget.value)
		},
		[]
	)
	const handleDescriptionEnter = React.useCallback(async () => {
		await api.updateTodo({ ...props, description: description })
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}, [props, description])

	return (
		<VStack gap={12}>
			<Input
				value={title}
				onChange={handleTitleChange}
				onEnter={handleTitleEnter}
				stretch
			/>
			<Input
				label="Description"
				value={description}
				onChange={handleDescriptionChange}
				onEnter={handleDescriptionEnter}
				stretch
			/>
		</VStack>
	)
}
