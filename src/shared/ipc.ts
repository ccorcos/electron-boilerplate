import { ipcMain, ipcRenderer } from "electron"

type IPCFunctions = { [eventName: string]: (args: any) => any }

type AsyncIPCFunctions<T extends IPCFunctions> = {
	[eventName in keyof T]: (
		...args: Parameters<T[eventName]>
	) => Promise<ReturnType<T[eventName]>>
}

export function createMainIpcServer<T extends IPCFunctions>(events: T) {
	for (const [eventName, fn] of Object.entries(events)) {
		ipcMain.handle(eventName, async (event, arg) => {
			try {
				const result = await fn(arg)
				return { result }
			} catch (error) {
				console.error(error)
				return { error: { message: error.message, stack: error.stack } }
			}
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
					return async (arg) => {
						const response: any = await ipcRenderer.invoke(prop, arg)
						if (response.error) {
							throw response.error
						} else {
							return response.result
						}
					}
				}
			},
		}
	)

	return api
}
