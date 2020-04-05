import electron from "electron"
import * as path from "path"
import sqlite3 from "better-sqlite3"
import { TodoValue } from "../shared/types"

// Create the database.
const userDataPath = electron.app.getPath("userData")
const dbPath = path.join(userDataPath, "app.db")
const db = sqlite3(dbPath, { verbose: console.log })

// Migrate to the latest schema.
const statements: Array<string> = [
	`
	CREATE TABLE IF NOT EXISTS todos (
		id TEXT PRIMARY KEY,
		text TEXT NOT NULL,
		completed BOOLEAN NOT NULL,
		created_at TEXT NOT NULL,
		description TEXT
	)
	`,
	`
	CREATE INDEX IF NOT EXISTS todos_index_all (created_at DESC, id)
	`,
	`
	CREATE INDEX IF NOT EXISTS todos_index_incomplete (created_at DESC, id)
	WHERE completed = false
	`,
]
for (const statement of statements) {
	db.prepare(statement).run()
}

const createTodoQuery = db.prepare(`
	INSERT INTO todos (id, text, completed, created_at, description)
	VALUES ($id, $text, $completed, $created_at, $description)
`)
export function createTodo(value: TodoValue) {
	createTodoQuery.run(value)
}

const getAllTodosQuery = db.prepare(`
	SELECT * FROM todos
	ORDER BY created_at DESC
`)
export function getAllTodos() {
	return getAllTodosQuery.all() as Array<TodoValue>
}

const getIncompleteTodosQuery = db.prepare(`
	SELECT * FROM todos
	WHERE complete = false
	ORDER BY created_at DESC
`)
export function getIncompleteTodos() {
	return getIncompleteTodosQuery.all() as Array<TodoValue>
}
