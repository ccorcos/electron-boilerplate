import * as React from "react"
import { Route } from "../../shared/routeHelpers"
import { useRouter } from "./Router"

export function Redirect(props: { to: Route }) {
	const { navigate } = useRouter()
	React.useEffect(() => navigate(props.to), [props.to])
	return null
}
