import * as React from "react"
import { Page, Heading, Button, Box, Input } from "./UI"
import { useRouter } from "./Router"
import { TodoValue } from "../../shared/types"
import { api } from "../api"
import { useAync } from "../hooks/useAsync"
import { randomId } from "../../shared/randomId"

export function TodoList() {
	const { back } = useRouter()

	const [showCompleted, setShowCompleted] = React.useState(true)

	const [refetch, setRefetch] = React.useState(0)

	const request = useAync(async () => {
		if (showCompleted) {
			return api.getAllTodos()
		} else {
			return api.getIncompleteTodos()
		}
	}, [showCompleted, refetch])

	const showSpinner = request.fetching && request.spinner

	const newTodoItem = React.useCallback(async () => {
		await api.createTodo({
			id: randomId(),
			title: "",
			completed: 0,
			created_at: new Date().toISOString(),
			description: "",
		})
		setRefetch(refetch + 1)
	}, [refetch])

	return (
		<Page>
			<Heading>Todos</Heading>
			<Button onClick={newTodoItem}>New</Button>
			{showSpinner && <Box>Loading...</Box>}
			{request.error && <Box color="error">{request.error.message}</Box>}
			{request.data &&
				request.data.map((todoValue) => {
					return <TodoItem key={todoValue.id} {...todoValue} />
				})}
		</Page>
	)
}

export function TodoItem(props: TodoValue) {
	const [text, setText] = React.useState(props.title)
	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setText(e.currentTarget.value)
		},
		[]
	)
	const handleEnter = React.useCallback(async () => {
		await api.updateTodo({ ...props, title: text })
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur()
		}
	}, [props.id, text])

	return (
		<Box>
			<Input value={text} onChange={handleChange} onEnter={handleEnter}></Input>
		</Box>
	)
}
