export interface TodoValue {
	id: string
	text: string
	created_at: string
	completed: boolean
	description?: string
}

export type RendererToMainApi = {
	createTodo: (value: TodoValue) => void
	getAllTodos: () => Array<TodoValue>
	getIncompleteTodos: () => Array<TodoValue>
}
