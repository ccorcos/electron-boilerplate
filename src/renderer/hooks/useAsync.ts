import { useState, useEffect, useRef } from "react"

type AsyncState<T> =
	| { fetching: false; error: Error; data?: undefined }
	| { fetching: false; error?: undefined; data: T }
	| { fetching: true; spinner: boolean; error?: Error; data?: undefined }
	| { fetching: true; spinner: boolean; error?: undefined; data?: T }

export function useAync<T>(fn: () => Promise<T>, dependencies: Array<any>) {
	const [state, setState] = useState<AsyncState<T>>({
		fetching: true,
		spinner: false,
	})

	// Only setState if its the current request.
	const requestCount = useRef(0)
	const spinnerDelay = useRef<number | undefined>()

	useEffect(() => {
		// Set fetching state.
		if (!state.fetching) {
			setState({ ...state, spinner: false, fetching: true })
		}

		// Start a timer to turn the spinner on.
		if (
			state.fetching &&
			!state.spinner &&
			spinnerDelay.current === undefined
		) {
			spinnerDelay.current = window.setTimeout(() => {
				setState({ ...state, spinner: true })
			}, 300)
		}

		// Keep track of the request count so we don't setState from previous hung requests.
		requestCount.current += 1
		const current = requestCount.current
		fn()
			.then((data) => {
				if (requestCount.current === current) {
					clearTimeout(spinnerDelay.current)
					spinnerDelay.current = undefined
					setState({ fetching: false, data })
				}
			})
			.catch((error) => {
				if (requestCount.current === current) {
					clearTimeout(spinnerDelay.current)
					spinnerDelay.current = undefined
					setState({ fetching: false, error })
				}
			})
	}, dependencies)

	return state
}
