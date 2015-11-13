export default function warningMiddleware({ dispatch, getState }) {
	return next => action => {
		if (action.error) {
			const error = typeof action.error === 'object' ? action.error :
				action.payload
			console.log(error.message)
		}
		return next(action)
	}
}