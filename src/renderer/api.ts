import { createRendererIpcClient } from "../shared/ipc"
import { RendererToMainApi } from "../shared/types"

export const api = createRendererIpcClient<RendererToMainApi>()
