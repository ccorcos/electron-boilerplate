export interface TodoValue {
	id: string
	title: string
	created_at: string
	completed: 1 | 0
	description: string
}

export type RendererToMainApi = {
	createTodo: (value: TodoValue) => void
	updateTodo: (value: TodoValue) => void
	getAllTodos: () => Array<TodoValue>
	getIncompleteTodos: () => Array<TodoValue>
}
