import ipc from "electron-better-ipc"

type IPCFunctions = { [eventName: string]: (args: any) => any }

type AsyncIPCFunctions<T extends IPCFunctions> = {
	[eventName in keyof T]: (
		...args: Parameters<T[eventName]>
	) => Promise<ReturnType<T[eventName]>>
}

export function createMainIpcServer<T extends IPCFunctions>(events: T) {
	for (const [eventName, fn] of Object.entries(events)) {
		ipc.ipcMain.answerRenderer(eventName, (arg) => {
			return fn(arg)
		})
	}
}

export function createRendererIpcClient<
	T extends IPCFunctions
>(): AsyncIPCFunctions<T> {
	const api: any = new Proxy(
		{},
		{
			get: function (obj, prop) {
				if (typeof prop === "string") {
					return async (arg) => ipc.ipcRenderer.callMain(prop, arg)
				}
			},
		}
	)

	return api
}
