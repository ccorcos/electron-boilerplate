import { createRendererIpcClient } from "../shared/ipc"
import { RendererToMainApi } from "../shared/types"

const api = createRendererIpcClient<RendererToMainApi>()
window["__api"] = api

export type ClientApi = typeof api
