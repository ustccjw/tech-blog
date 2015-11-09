export const checkStatus = async response => {
	if (response.status >= 200 && response.status < 300) {
		return response.json()
	} else {
		throw new Error(response.statusText)
	}
}
