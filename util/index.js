export const checkStatus = async response => {
	if (response.status >= 200 && response.status < 300) {
		return response.json()
	}
	throw new Error(response.statusText)
}

export const object2Array = obj => Object.keys(obj).map(key => obj[key])

export const getObjectByKeys = (obj, keys) => {
	const res = {}
	keys.forEach(key => {
		res[key] = obj[key]
	})
	return res
}

export const safeScript = str => {
	const tagsToReplace = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
	}
	return str.replace(/[&<>]/g, tag => tagsToReplace[tag])
}

export const unsafeScript = str => {
	const tagsToReplace = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
	}
	return str.replace(/(&amp;|&lt;|&gt;)/g, tag => tagsToReplace[tag])
}
