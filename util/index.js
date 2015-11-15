export const checkStatus = async response => {
	if (response.status >= 200 && response.status < 300) {
		return response.json()
	} else {
		throw new Error(response.statusText)
	}
}

export const object2Array = obj => Object.keys(obj).map(key => obj[key])
