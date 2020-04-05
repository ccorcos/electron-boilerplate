// Auto-reload in dev.
try {
	require("electron-reloader")(module)
} catch (_) {}

import { app, BrowserWindow } from "electron"
import * as path from "path"
import * as sqlite from "./sqlite"
import { createMainIpcServer } from "../shared/ipc"
import { RendererToMainApi } from "../shared/types"

// Create the IPC apis.
createMainIpcServer<RendererToMainApi>({
	createTodo: sqlite.createTodo,
	updateTodo: sqlite.updateTodo,
	getTodo: sqlite.getTodo,
	getAllTodos: sqlite.getAllTodos,
})

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	})

	// and load the index.html of the app.
	mainWindow.loadFile(path.join("..", "renderer", "index.html"))

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") app.quit()
})

app.on("activate", function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
